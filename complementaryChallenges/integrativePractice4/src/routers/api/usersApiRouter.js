import { Router } from 'express';
import { createHash } from '../../utilities.js';
import { authenticationMidd, authorizationMidd } from '../../middlewares/authMiddlewares.js'
import CartsDao from '../../dao/cartMongoDao.js';
import UserModel from '../../models/userModel.js';
import UserController from '../../controllers/userContoller.js';

const router = Router();

router.get('/users', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
  try {
    const users = await UserController.getUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.post('/users', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
  try {
    const {
      body: { first_name, last_name, email, age, password, role },
    } = req;
    if (!first_name || !last_name || !email || !password) {
      req.logger.error('All fields are required to successfully register the user')
      return res.status(400).send({ message: 'All fields are required' });
    }
    let user = await UserModel.findOne({ email });
    if (user) {
      req.logger.warning('Already registered user');
      return res.status(400).send({ message: 'Already registered user' });
    }
    user = await UserController.create({
      first_name,
      last_name,
      email,
      age, 
      password: createHash(password),
      role,
    });
    const cartDao = new CartsDao();
    await cartDao.createCart({ user: user._id });
    req.logger.info('Successfully registered user');
    res.status(201).send({ message: 'Successfully registered user' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.get('/users/:uid', async (req, res, next) => {
  try {
    const {
      params: { uid },
    } = req;
    const user = await UserController.getById(uid);
    res.status(200).json(user);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.put('/users/:uid', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
  try {
    const {
      body,
      params: { uid },
    } = req;
    await UserController.updateUser(uid, body);
    req.logger.info('User successfully updated');
    res.status(201).json(`The following items were updated: ${body}`);
  } catch (error) {
    next(error);
  }
});

router.delete('/users/:uid', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
  try {
    const {
      params: { uid },
    } = req;
    await UserController.deleteUser(uid);
    req.logger.info('User successfully removed');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put('/users/premium/:uid', authenticationMidd('jwt'), authorizationMidd(['user', 'premium']), async (req, res, next) => {
  try {
    const {
      params: { uid },
    } = req;

    const user = await UserController.getById(uid);

    if (user.role === 'user'){
      await UserController.updateUser(uid, { role: 'premium' })
    }else {
      await UserController.updateUser(uid, { role: 'user' })
    }
    await user.save()
  
    return res.status(200).json({ message: 'Now your have a new role' });

  } catch (error) {
    next(error);
  }
})

export default router;

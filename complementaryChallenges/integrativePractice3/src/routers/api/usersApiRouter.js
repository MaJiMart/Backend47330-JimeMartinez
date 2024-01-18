import { Router } from 'express';
import { authenticationMidd, authorizationMidd } from '../../utilities.js';

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
    const { body } = req;
    const user = await UserController.createUser(body);
    req.logger.info('User created successfully');
    res.status(201).json(user);
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

router.get('/users/:uid', authenticationMidd('jwt'), authorizationMidd('admin'), async (req, res, next) => {
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

export default router;

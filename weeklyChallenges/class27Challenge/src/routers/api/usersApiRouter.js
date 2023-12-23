import { Router } from 'express';
import UserController from '../../controllers/userContoller.js';

const router = Router();

router.get('/users', async (req, res, next) => {
  try {
    const users = await UserController.getUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UserController.create(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
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

router.put('/users/:uid', async (req, res, next) => {
  try {
    const {
      body,
      params: { uid },
    } = req;
    await UserController.updateById(uid, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/users/:uid', async (req, res, next) => {
  try {
    const {
      params: { uid },
    } = req;
    await UserController.deleteById(uid);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;

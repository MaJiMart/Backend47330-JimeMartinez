import { Router } from 'express';
import UserController from '../../controllers/userContoller.js';
import passport from 'passport';
import { authorizationMidd } from '../../utilities.js';

const router = Router();

router.get(
  '/users',/* 
  passport.authenticate('jwt', { session: false }),
  authorizationMidd('admin'), */
  async (req, res, next) => {
    try {
      const users = await UserController.get(req.query);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/users',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { body } = req;
      const user = await UserController.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/users/:uid',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const {
        params: { uid },
      } = req;
      const user = await UserController.getById(uid);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/users/:uid',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
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
  }
);

router.delete(
  '/users/:uid',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const {
        params: { uid },
      } = req;
      await UserController.deleteById(uid);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
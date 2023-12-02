import { Router } from 'express';
import {
  isValidPassword,
  tokenGenerator,
  verifyToken,
  authenticationMidd,
  authorizationMidd,
} from '../../utilities.js';
import UserModel from '../../models/userModel.js';

const router = Router();

router.post('/auth-login', async (req, res) => {
  const {
    body: { email, password },
  } = req;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Unregistered user' });
  }
  const validPass = isValidPassword(password, user);
  if (!validPass) {
    return res.status(401).json({ message: 'Wrong email or password' });
  }
  const token = tokenGenerator(user);
  res
    .cookie('access_token', token, { maxAge: 60000, httpOnly: true })
    .status(200)
    .json({ status: 'success' });
});

router.get('/current', authenticationMidd('jwt'), authorizationMidd(['user', 'seller', 'admin']), (req, res) => {
  res.status(200).json(req.user)
})

router.get('/admin', authenticationMidd('jwt'), authorizationMidd('admin'), (req, res) => {
  res.status(200).json({ success: true})
})

export default router;

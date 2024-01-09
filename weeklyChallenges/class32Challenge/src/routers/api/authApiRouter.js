import { Router } from 'express';
import UserModel from '../../models/userModel.js';
import { createHash, isValidPassword, tokenGenerator } from '../../utilities.js';

const router = Router();

router.post('/auth/register', async (req, res) => {
  const {
    body: { first_name, last_name, email, password },
  } = req;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  let user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Already registered user' });
  }
  user = await UserModel.create({
    first_name,
    last_name,
    email,
    password: createHash(password),
  });
  res.status(201).json({ message: 'Successfully registered user' });
});

router.post('/auth/login', async (req, res) => {
  const {
    body: { email, password },
  } = req;
  if (!email || !password) {
    return res.status(401).json({ message: 'Wrong email or password' });
  }
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
    .cookie('access_token', token, {
      maxAge: 600000,
      httpOnly: true,
      //signed: true,
    })
    .status(200)
    .json({ status: 'success' });
});

export default router;

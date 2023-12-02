import { Router } from 'express';
import {
  isValidPassword,
  tokenGenerator,
  verifyToken,
  authMiddleware,
} from '../../utilities.js';
import UserModel from '../../models/userModel.js';

const router = Router();

/* router.get('/', (req, res) => {
  res.render('index', { title: 'Ecofriendly Shop' });
});*/

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

router.get('/current', authMiddleware('jwt'), (req, res) => {
  res.status(200).json(req.user)
})



export default router;

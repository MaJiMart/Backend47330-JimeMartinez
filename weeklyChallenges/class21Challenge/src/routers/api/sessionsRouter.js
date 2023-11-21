import { Router } from 'express';
import passport from 'passport';
import { createHash } from '../../utilities.js';
import UserModel from '../../models/userModel.js';

const router = Router();

router.post('/sessions/register', passport.authenticate('register', { failureRedirect: '/register' }), (req, res) => {
  res.redirect('/');
})

router.post('/sessions/login', passport.authenticate('login', { failureRedirect: '/' }), (req, res) => {
  req.session.user = req.user;
  if (req.user.rol === 'admin') {
    return res.redirect('/adminProducts');
  }
  res.redirect('/products');
});

router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/sessions/githubcb', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  req.session.user = req.user;
  if (req.user.rol === 'admin') {
    return res.redirect('/adminProducts');
  }
  res.redirect('/products');
});

router.post('/sessions/recoverPass', async(req, res) => {
  const { email, newPassword } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).send('Wrong email or password.');
  }
  await UserModel.updateOne({ email }, { $set: { password: createHash(newPassword) } });
  res.redirect('/');
});

router.get('/sessions/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/');
  });
});

export default router;
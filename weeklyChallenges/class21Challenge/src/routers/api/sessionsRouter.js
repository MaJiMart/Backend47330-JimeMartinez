import { Router } from 'express';
import passport from 'passport';
import { createHash, isValidPassword } from '../../utilities.js';
import userModel from '../../models/userModel.js';

const router = Router();

router.post("/sessions/register", async (req, res) => {
  const { body } = req;
  await userModel.create({ ...body, password: createHash(body.password) });
  res.redirect("/");
});

/* router.post('/sessions/register', passport.authenticate('register', {failureRedirect: '/register'}), (req, res) => {
    res.redirect("/");
  }); */

router.post('/sessions/login', async (req, res) => {
  const { body: { email, password } } = req;

  const adminUser = {
    email: 'adminCoder@coder.com',
    password: 'adminCod3r123',
    rol: 'admin',
  };

  if (email === adminUser.email && password === adminUser.password) {
    req.session.user = {
      first_name: 'Coder',
      last_name: 'House',
      email: adminUser.email,
      rol: adminUser.rol,
    };
    return res.redirect('/adminProducts');
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).send('Wrong email or password.');
  }
  const validPass = isValidPassword(password, user);
  if (!validPass) {
    return res.status(401).send('Wrong email or password.');
  }
  const { first_name, last_name, rol } = user;
  req.session.user = { first_name, last_name, rol, email };
  if (rol === 'user') {
    res.redirect('/products');
  }
});

/* router.post('/sessions/login', passport.authenticate('login', {failureRedirect: '/login'}), (req, res) => {
   res.redirect("/products");
}); */

router.post('/sessions/recoverPass', async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).send('Wrong email or password.');
  }

  await userModel.updateOne(
    { email },
    { $set: { password: createHash(newPassword) } }
  );
  res.redirect('/');
});

router.get('/sessions/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/');
  });
});

export default router;

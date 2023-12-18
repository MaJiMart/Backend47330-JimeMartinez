import { Router } from 'express';
import { authenticationMidd, authorizationMidd } from '../../utilities.js';

const router = Router();

router.get('/current', authenticationMidd('jwt'), authorizationMidd(['user', 'seller', 'admin']), (req, res) => {
  res.status(200).json(req.user)
})

router.get('/admin', authenticationMidd('jwt'), authorizationMidd(['admin']), (req, res) => {
  res.status(200).json({ success: true})
})

export default router;

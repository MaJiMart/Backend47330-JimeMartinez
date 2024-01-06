import { Router } from 'express';
import path from 'path';
import { __dirname } from '../../utilities.js';
import MailService from '../../services/mailService.js';

const router = Router();

router.get('/send-email', async (req, res, next) => {
  try {
    const result = await MailService.sendEmail(
      'majimart.dev@gmail.com',
      'Prueba de envío',
      `
      <div>
        <h1>Hola!</h1>
        <p>Probando envío de email desde Node</p>
        <img src:"cid:pink-github-001"/>
      </div>
      `,
      [
        {
          filename: 'pink-github-logo.png',
          path: path.join(__dirname, './img/Github.png'),
          cid: 'pink-github-001'
        }
      ]
    );
    console.log('result', result);
    res.status(200).json({ message: 'Successful email sending' });
  } catch (error) {
    next(res.status(error.statusCode || 500).json({ message: error.message }));
  }
});

export default router;

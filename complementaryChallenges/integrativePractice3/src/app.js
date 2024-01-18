import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import { __dirname, COOKIE_SECRET, Exception } from './utilities.js';
import { addLogger } from './config/logger.js';
/* Views */
import indexRouter from './routers/views/indexRouter.js';
import registerRouter from './routers/views/registerRouter.js';
/* Apis */
import authApiRouter from './routers/api/authApiRouter.js';
import usersApiRouter from './routers/api/usersApiRouter.js';
import productsApiRouter from './routers/api/productsApiRouter.js';
import cartsApiRouter from './routers/api/cartsApiRouter.js';
import notificationsApiRouter from './routers/api/notificationsApiRouter.js';
/* Mock */
import mockprodApiRouter from './mock/mockprodApiRouter.js';
/* Logger Test*/
import loggersApiRouter from './routers/api/loggersApiRouter.js';

const app = express();

app.use(addLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser(COOKIE_SECRET));

initPassport();
app.use(passport.initialize());

app.use('/', indexRouter, registerRouter, mockprodApiRouter, loggersApiRouter);
app.use('/api', productsApiRouter, cartsApiRouter, authApiRouter, usersApiRouter, notificationsApiRouter);

app.use((error, req, res, next) => {
  if (error instanceof Exception) {
    res.status(error.status).json({ status: 'error', message: error.message });
  }else{
    const message = `Ups! An unknown error occurred: ${error.message}, sorry`;
  console.log(message);
  res.status(500).json({ status: 'error', message });
  }
});

export default app;
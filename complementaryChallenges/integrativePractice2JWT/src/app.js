import express from 'express';
//import handlebars from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import { __dirname, COOKIE_SECRET } from './utilities.js';
/* Views */
import indexRouter from './routers/views/indexRouter.js'
import registerRouter from './routers/views/registerRouter.js';
/* Apis */
import productsApiRouter from './routers/api/productsApiRouter.js';
import cartsApiRouter from './routers/api/cartsApiRouter.js';
import authApiRouter from './routers/api/authApiRouter.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser(COOKIE_SECRET));

initPassport()
app.use(passport.initialize())

/* app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars'); */

app.use('/', indexRouter, registerRouter)
app.use('/api', productsApiRouter, cartsApiRouter, authApiRouter);

app.use((error, req, res, next) =>{
    const message = `Ups! Ha ocurrido un error: ${error.message}, lo sentimos`;
    console.log(message);
    res.status(500).json({ status: 'error', message})
});

export default app
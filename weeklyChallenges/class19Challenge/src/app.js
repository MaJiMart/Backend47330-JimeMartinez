import express from 'express';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { URI } from './db/mongodb.js'
import { __dirname, sessionSecret } from './utilities.js';
/* Views */
import indexRouter from './routers/views/indexRouter.js';
import productsRouter from './routers/views/productsRouter.js';
import cartRouter from './routers/views/cartRouter.js';
import registerRouter from './routers/views/registerRouter.js'
import adminProdRouter from './routers/views/adminProdRouter.js';
/* Apis */
import productsApiRouter from './routers/api/productsApiRouter.js';
import cartsApiRouter from './routers/api/cartsApiRouter.js';
import sessionApiRouter from './routers/api/sessionsRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.use (expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: URI,
        ttl: 86400,
    }),
}))

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', indexRouter, productsRouter, cartRouter, registerRouter, adminProdRouter);
app.use('/api', productsApiRouter, cartsApiRouter, sessionApiRouter);

app.use((error, req, res, next) =>{
    const message = `Ups! Ha ocurrido un error: ${error.message}, lo sentimos`;
    console.log(message);
    res.status(500).json({ status: 'error', message})
})

export default app
import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utilities.js';
/* Views */
import indexRouter from './routers/views/indexRouter.js';
import productsRouter from './routers/views/productsRouter.js';
import cartRouter from './routers/views/cartRouter.js';
/* Apis */
import productsApiRouter from './routers/api/productsApiRouter.js';
import cartsApiRouter from './routers/api/cartsApiRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', indexRouter, productsRouter, cartRouter);
app.use('/api', productsApiRouter, cartsApiRouter);

app.use((error, req, res, next) =>{
    const message = `Ups! Ha ocurrido un error: ${error.message}, lo sentimos`;
    console.log(message);
    res.status(500).json({ status: 'error', message})
})

export default app
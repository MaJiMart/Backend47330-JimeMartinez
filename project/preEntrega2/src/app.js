import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import router from './routers/views/indexRouter.js';
import productsRouter from './routers/views/productsRouter.js';
import productsApiRouter from './routers/api/productsApiRouter.js';
import { __dirname } from './utilities.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', router, productsRouter);
app.use('/api', productsApiRouter);

app.use((error, req, res, next) =>{
    const message = `Ups! Ha ocurrido un error: ${error.message}, lo sentimos`;
    console.log(message);
    res.status(500).json({ status: 'error', message})
})

export default app
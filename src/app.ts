// importaciones
import express, {Request, Response} from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportMiddleware from './middlewares/passport.middleware';
import productsRouter from './routes/products.routes';
import authRouter from './routes/auth.routes';
import imageRouter from './routes/images.routes';
import usersRouter from './routes/users.routes';
import ordersRouter from './routes/orders.routes';

// inicializacion
const app = express();

// configuraciones
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload());
app.use(passport.initialize());
passport.use(passportMiddleware);

// rutas
app.get('/', (req: Request, res: Response) => {
    res.send(`Puedes realizar peticiones en: ${req.headers.host}/<URI_METHODS>`);
});

// enrutador de productos
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/images', imageRouter);
app.use(authRouter);

export default app;

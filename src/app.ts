// importaciones
import express, {Request, Response} from 'express';
import productsRouter from './routes/products.routes';
import fileUpload from 'express-fileupload';
import imageRouter from './routes/images.routes';
import usersRouter from './routes/users.routes';

// inicializacion
const app = express();

// configuraciones
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload());

// rutas
app.get('/', (req: Request, res: Response) => {
    res.send(`Puedes realizar peticiones en: ${req.headers.host}/<URI_METHODS>`);
});

// enrutador de productos
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/images', imageRouter);

export default app;

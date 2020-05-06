// importaciones
import express, {Request, Response} from 'express';
import productsRouter from './routes/products.routes';
import iamgesRouter from './routes/images.routes';

// inicializacion
const app = express();

// configuraciones
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// rutas
app.get('/', (req: Request, res: Response) => {
    res.send(`Puedes realizar peticiones en: ${req.headers.host}/<URI_METHODS>`);
});

// enrutador de productos
app.use('/products', productsRouter);
// enrutador de imagenes
app.use('/images', iamgesRouter);

export default app;

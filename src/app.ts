// importaciones
import express, {Request, Response} from 'express';

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

export default app;

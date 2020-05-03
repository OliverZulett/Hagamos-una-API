// importaciones
import express, {Request, Response} from 'express';
import Product from './models/products.model';

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

app.get('/products', (req: Request, res: Response) => {
    Product.find({}, "name image price", (err, products) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al buscar productos',
                errors: err
            });
        }

        Product.countDocuments( (err, total) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'error al contar productos',
                    errors: err
                });
            }
            
            res.status(200).json({
                ok: true,
                message: 'lista de productos',
                productos: products,
                total_productos: total
            });
        });

    });
});

app.get('/products/:id', (req:Request, res:Response) => {
    const id = req.params.id;
    Product.findById(id, (err, product) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al buscar producto',
                errors: err
            });
        }
        
        res.status(200).json({
            ok: true,
            message: 'producto',
            producto: product
        });
    });
});

app.post('/products', (req:Request, res:Response) => {
    const productReceived = req.body;
    if (!productReceived || Object.keys(productReceived).length < 3) {
        return res.status(400).json({
            ok: false,
            message: 'parametros incompletos'
        });
    }
    const product = new Product(productReceived);
    product.save((err, newProduct) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al guaradar producto',
                errors: err
            });
        }
        
        res.status(200).json({
            ok: true,
            message: 'producto creado',
            producto: newProduct
        });
    });
});

app.put('/products/:id', (req:Request, res:Response)=>{
    const id = req.params.id;
    const productReceived = req.body;
    if (!productReceived || Object.keys(productReceived).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'Nada que actualizar'
        });
    }
    Product.findById(id, (err, productForUpdate: any) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al encontrar producto',
                errors: err
            });
        }

        const newProduct = { ...productForUpdate._doc, ...productReceived };

        Product.findByIdAndUpdate(id, newProduct, (err, productUpdated) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'error al actualizar producto',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                message: 'producto actualizado',
                old_product: productUpdated,
                new_producto: newProduct
            });
        })
        
    });
})

app.delete('/products/:id', (req:Request, res:Response)=>{
    const id = req.params.id;
    Product.findByIdAndDelete(id, (err, productDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al eliminar producto',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            message: 'producto eliminado',
            producto: productDeleted
        });
    });
});


export default app;

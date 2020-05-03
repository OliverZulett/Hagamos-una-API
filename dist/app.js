"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importaciones
const express_1 = __importDefault(require("express"));
const products_model_1 = __importDefault(require("./models/products.model"));
// inicializacion
const app = express_1.default();
// configuraciones
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// rutas
app.get('/', (req, res) => {
    res.send(`Puedes realizar peticiones en: ${req.headers.host}/<URI_METHODS>`);
});
app.get('/products', (req, res) => {
    products_model_1.default.find({}, "name image price", (err, products) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al buscar productos',
                errors: err
            });
        }
        products_model_1.default.countDocuments((err, total) => {
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
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    products_model_1.default.findById(id, (err, product) => {
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
app.post('/products', (req, res) => {
    const productReceived = req.body;
    if (!productReceived || Object.keys(productReceived).length < 3) {
        return res.status(400).json({
            ok: false,
            message: 'parametros incompletos'
        });
    }
    const product = new products_model_1.default(productReceived);
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
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const productReceived = req.body;
    if (!productReceived || Object.keys(productReceived).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'Nada que actualizar'
        });
    }
    products_model_1.default.findById(id, (err, productForUpdate) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'error al encontrar producto',
                errors: err
            });
        }
        const newProduct = Object.assign(Object.assign({}, productForUpdate._doc), productReceived);
        products_model_1.default.findByIdAndUpdate(id, newProduct, (err, productUpdated) => {
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
        });
    });
});
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    products_model_1.default.findByIdAndDelete(id, (err, productDeleted) => {
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
exports.default = app;

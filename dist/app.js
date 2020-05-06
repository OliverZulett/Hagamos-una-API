"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importaciones
const express_1 = __importDefault(require("express"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// inicializacion
const app = express_1.default();
// configuraciones
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_fileupload_1.default());
// rutas
app.get('/', (req, res) => {
    res.send(`Puedes realizar peticiones en: ${req.headers.host}/<URI_METHODS>`);
});
// enrutador de productos
app.use('/products', products_routes_1.default);
exports.default = app;

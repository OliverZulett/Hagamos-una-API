"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importaciones
const express_1 = __importDefault(require("express"));
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
exports.default = app;

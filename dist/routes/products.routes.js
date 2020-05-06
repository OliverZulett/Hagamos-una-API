"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const productsRouter = express_1.Router();
// lista de productos
productsRouter.get('/', products_controller_1.default.productList);
// obtener un producto por su id
productsRouter.get('/:id', products_controller_1.default.getProductById);
// crea un nuevo producto
productsRouter.post('/', products_controller_1.default.createProduct);
// actualiza un producto
productsRouter.put('/:id', products_controller_1.default.updateProduct);
// actualiza un producto
productsRouter.delete('/:id', products_controller_1.default.deleteProduct);
exports.default = productsRouter;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = __importDefault(require("../models/products.model"));
const productsController = {
    productList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield products_model_1.default.find({}, "name image price", (err, products) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'error al buscar productos',
                        errors: err
                    });
                }
                yield products_model_1.default.countDocuments((err, total) => {
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
            }));
        });
    },
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield products_model_1.default.findById(id, (err, product) => {
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
    },
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'debe subir una imagen'
                });
            }
            const image = req.files.image;
            const productReceived = req.body;
            if (!productReceived || Object.keys(productReceived).length < 2) {
                return res.status(400).json({
                    ok: false,
                    message: 'parametros incompletos'
                });
            }
            image.mv('./uploads/products/image.jpg', (err) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'error al guardar imagen',
                        errors: err
                    });
                }
            });
            const product = new products_model_1.default(productReceived);
            product.image = 'image.jpg';
            yield product.save((err, newProduct) => {
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
    },
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const productReceived = req.body;
            if (!productReceived || Object.keys(productReceived).length === 0) {
                return res.status(400).json({
                    ok: false,
                    message: 'Nada que actualizar'
                });
            }
            yield products_model_1.default.findById(id, (err, productForUpdate) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'error al encontrar producto',
                        errors: err
                    });
                }
                const newProduct = Object.assign(Object.assign({}, productForUpdate._doc), productReceived);
                yield products_model_1.default.findByIdAndUpdate(id, newProduct, (err, productUpdated) => {
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
            }));
        });
    },
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield products_model_1.default.findByIdAndDelete(id, (err, productDeleted) => {
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
    }
};
exports.default = productsController;

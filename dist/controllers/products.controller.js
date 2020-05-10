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
const uuid_1 = require("uuid");
const fs_extra_1 = __importDefault(require("fs-extra"));
const statusResponse_function_1 = require("../functions/statusResponse.function");
const productsController = {
    productList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield products_model_1.default.find({}, "name image price", (err, products) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return statusResponse_function_1.statusResponse(res, 500, "error al buscar productos", err);
                // {
                //   return res.status(500).json({
                //     ok: false,
                //     message: "error al buscar productos",
                //     errors: err,
                //   });
                // }
                yield products_model_1.default.countDocuments((err, total) => {
                    if (err)
                        return statusResponse_function_1.statusResponse(res, 500, "error al contar productos", err);
                    // {
                    //   return res.status(500).json({
                    //     ok: false,
                    //     message: "error al contar productos",
                    //     errors: err,
                    //   });
                    // }
                    statusResponse_function_1.statusResponse(res, 200, "lista de productos", null, { productos: products, total_productos: total });
                    // res.status(200).json({
                    //   ok: true,
                    //   message: "lista de productos",
                    //   productos: products,
                    //   total_productos: total
                    // });
                });
            }));
        });
    },
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield products_model_1.default.findById(id, (err, product) => {
                if (err)
                    return statusResponse_function_1.statusResponse(res, 500, "error al buscar producto", err);
                statusResponse_function_1.statusResponse(res, 200, "lista de productos", null, { producto: product });
            });
        });
    },
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0)
                return statusResponse_function_1.statusResponse(res, 400, "debe subir una imagen", { err: "debe subir una imagen" });
            let image = req.files.image;
            const productReceived = req.body;
            if (!productReceived || Object.keys(productReceived).length < 2)
                return statusResponse_function_1.statusResponse(res, 400, "parametros incompletos", { err: "parametros incompletos" });
            let fileName = "";
            if (image.mimetype === "image/png" ||
                image.mimetype === "image/jpeg" ||
                image.mimetype === "image/gif") {
                const path = `./uploads${req.baseUrl}`;
                const fileExtension = image.mimetype.split("/")[1];
                fileName = `${uuid_1.v4()}.${fileExtension}`;
                yield fs_extra_1.default.ensureDir(path);
                yield image.mv(`${path}/${fileName}`, function (err) {
                    if (err)
                        return statusResponse_function_1.statusResponse(res, 500, "error al guaradar imagen", err);
                });
            }
            else
                return statusResponse_function_1.statusResponse(res, 400, "el archivo no es una imagen", { err: "el archivo no es una imagen" });
            const product = new products_model_1.default(productReceived);
            product.image = fileName;
            yield product.save((err, newProduct) => {
                if (err)
                    return statusResponse_function_1.statusResponse(res, 500, "error al guardar producto", err);
                statusResponse_function_1.statusResponse(res, 200, "producto creado", null, { producto: newProduct });
            });
        });
    },
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const productReceived = req.body;
            if ((!productReceived || Object.keys(productReceived).length === 0) &&
                (!req.files || Object.keys(req.files).length === 0)) {
                return statusResponse_function_1.statusResponse(res, 400, "Nada que actualizar", { err: "Nada que actualizar" });
            }
            yield products_model_1.default.findById(id, (err, productForUpdate) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return statusResponse_function_1.statusResponse(res, 500, "error al encontrar producto", err);
                const newProduct = Object.assign(Object.assign({}, productForUpdate._doc), productReceived);
                if (req.files && Object.keys(req.files).length !== 0) {
                    const image = req.files.image;
                    if (image.mimetype === "image/png" ||
                        image.mimetype === "image/jpeg" ||
                        image.mimetype === "image/gif") {
                        const path = `./uploads${req.baseUrl}`;
                        const fileExtension = newProduct.image.split(".")[1];
                        const fileName = `${newProduct.image.split(".")[0]}.${fileExtension}`;
                        yield fs_extra_1.default.ensureDir(path);
                        yield fs_extra_1.default.remove(`${path}/${newProduct.image}`);
                        yield image.mv(`${path}/${fileName}`, function (err) {
                            if (err)
                                return statusResponse_function_1.statusResponse(res, 500, "error al guaradar imagen", err);
                        });
                        newProduct.image = fileName;
                    }
                }
                yield products_model_1.default.findByIdAndUpdate(id, newProduct, (err, productUpdated) => {
                    if (err)
                        return statusResponse_function_1.statusResponse(res, 500, "error al actualizar producto", err);
                    statusResponse_function_1.statusResponse(res, 200, "producto actualizado", null, { old_product: productUpdated, new_producto: newProduct });
                });
            }));
        });
    },
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield products_model_1.default.findByIdAndDelete(id, (err, productDeleted) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return statusResponse_function_1.statusResponse(res, 500, "error al eliminar producto", err);
                const path = `./uploads${req.baseUrl}`;
                yield fs_extra_1.default.remove(`${path}/${productDeleted.image}`);
                statusResponse_function_1.statusResponse(res, 200, "producto eliminado", null, { producto: productDeleted });
            }));
        });
    },
};
exports.default = productsController;

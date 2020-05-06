import { Request, Response } from 'express';
import Product from '../models/products.model';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';

const productsController = {

    async productList(req: Request, res: Response) {
        await Product.find({}, "name image price", async (err, products) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'error al buscar productos',
                    errors: err
                });
            }
            await Product.countDocuments((err, total) => {
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
    },

    async getProductById(req: Request, res: Response) {
        const id = req.params.id;
        await Product.findById(id, (err, product) => {
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
    },

    async createProduct(req: Request, res: Response) {
        // validar que recibimos la imagen
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                message: 'debe subir una imagen'
            });
        }

        let image:any = req.files.image;
        const productReceived = req.body;

        if (!productReceived || Object.keys(productReceived).length < 2) {
            return res.status(400).json({
                ok: false,
                message: 'parametros incompletos'
            });
        }

        let fileName = '';
        if (image.mimetype === 'image/png' || image.mimetype === 'image/jpeg' ||  image.mimetype === 'image/gif') {
            const path = `./uploads${req.baseUrl}`;
            const fileExtension = image.mimetype.split('/')[1];
            fileName = `${uuidv4()}.${fileExtension}`;
            await fs.ensureDir(path);
            await image.mv(`${path}/${fileName}`, function (err:any) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'error al guaradar imagen',
                        errors: err
                    });
                }
            });
            
        } else {
            return res.status(400).json({
                ok: false,
                message: 'el archivo no es una imagen'
            });
        }

        const product = new Product(productReceived);
        product.image = fileName;

        await product.save((err, newProduct) => {
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
    },

    async updateProduct(req: Request, res: Response) {
        const id = req.params.id;
        const productReceived = req.body;
        if ((!productReceived || Object.keys(productReceived).length === 0) && ((!req.files || Object.keys(req.files).length === 0))) {
            return res.status(400).json({
                ok: false,
                message: 'Nada que actualizar'
            });
        }

        await Product.findById(id, async (err, productForUpdate: any) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'error al encontrar producto',
                    errors: err
                });
            }
            const newProduct = { ...productForUpdate._doc, ...productReceived };
            
            if (req.files && Object.keys(req.files).length !== 0) {
                const image:any = req.files!.image;
                if (image.mimetype === 'image/png' || image.mimetype === 'image/jpeg' ||  image.mimetype === 'image/gif') {
                    const path = `./uploads${req.baseUrl}`;
                    const fileExtension = newProduct.image.split('.')[1];
                    const fileName =  `${newProduct.image.split('.')[0]}.${fileExtension}`;
                    await fs.ensureDir(path);
                    await fs.remove(`${path}/${newProduct.image}`);
                    await image.mv(`${path}/${fileName}`, function (err:any) {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: 'error al guaradar imagen',
                                errors: err
                            });
                        }
                    });
                    newProduct.image = fileName;
                }
            }

            await Product.findByIdAndUpdate(id, newProduct, (err, productUpdated) => {
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
    },

    async deleteProduct(req: Request, res: Response) {
        const id = req.params.id;
        await Product.findByIdAndDelete(id, async (err, productDeleted:any) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'error al eliminar producto',
                    errors: err
                });
            }
            const path = `./uploads${req.baseUrl}`;
            await fs.remove(`${path}/${productDeleted.image}`);
            res.status(200).json({
                ok: true,
                message: 'producto eliminado',
                producto: productDeleted
            });
        });
    }
}

export default productsController;

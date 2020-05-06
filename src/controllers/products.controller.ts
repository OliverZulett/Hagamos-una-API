import { Request, Response } from 'express';
import Product from '../models/products.model';

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

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                message: 'debe subir una imagen'
            });
        }

        const image:any = req.files.image;
        const productReceived = req.body;

        if (!productReceived || Object.keys(productReceived).length < 2) {
            return res.status(400).json({
                ok: false,
                message: 'parametros incompletos'
            });
        }

        image.mv('./uploads/products/image.jpg', (err:any) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'error al guardar imagen',
                    errors: err
                });
            }
        });

        const product = new Product(productReceived);
        product.image = 'image.jpg';

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
        if (!productReceived || Object.keys(productReceived).length === 0) {
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
        await Product.findByIdAndDelete(id, (err, productDeleted) => {
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
    }
}

export default productsController;

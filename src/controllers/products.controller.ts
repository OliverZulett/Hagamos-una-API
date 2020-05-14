import { Request, Response } from "express";
import Product from "../models/product.model";
import fs from "fs-extra";
import { statusResponse } from '../functions/statusResponse.function';
import saveFile from "../functions/saveFile.function";
import updateFile from "../functions/updateFile.function";

const productsController = {
  async productList(req: Request, res: Response) {

    await Product.find({}, "name image price", async (err, products) => {
      if (err) return statusResponse(res, 500, "error al buscar productos", err);
      await Product.countDocuments((err, total) => {
        if (err) return statusResponse(res, 500, "error al contar productos", err);
        statusResponse( res, 200, "lista de productos", null, {productos: products, total_productos: total});
      });
    });

  },

  async getProductById(req: Request, res: Response) {
    const id = req.params.id;
    await Product.findById(id, (err, product:any) => {
      if (err || product === null) return statusResponse(res, 500, "error al buscar producto", err);
      if (Object.keys(product).length === 0)
        return statusResponse(res, 404, "no se encontro el producto", err);
      statusResponse( res, 200, "productos", null, {producto: product});
    });
  },

  async createProduct(req: Request, res: Response) {

    const productReceived = req.body;

    if (!productReceived || Object.keys(productReceived).length < 2)
      return statusResponse(res, 400, "parametros incompletos", {err: "parametros incompletos"});

    const product = new Product(productReceived);
    product.image = (<any>req).imageName;

    await saveFile(req, res);
    await product.save((err, newProduct) => {
      if (err) return statusResponse(res, 500, "error al guardar producto", err);
      statusResponse( res, 200, "producto creado", null, {producto: newProduct});
    });

  },

  async updateProduct(req: Request, res: Response) {
    const id = req.params.id;
    const productReceived = req.body;
    
    if (
      (!productReceived || Object.keys(productReceived).length === 0) && !(<any>req).imageExist
    ) {
      return statusResponse(res, 400, "Nada que actualizar", {err: "Nada que actualizar"});
    }

    await Product.findById(id, async (err, productForUpdate: any) => {
      if (err || productForUpdate === null) return statusResponse(res, 500, "error al encontrar producto", err);
      const newProduct = { ...productForUpdate._doc, ...productReceived };

      if ((<any>req).imageExist) {
        await updateFile(req, res, newProduct.image);
        newProduct.image = (<any>req).imageName;
      }

      await Product.findByIdAndUpdate(id, newProduct, (err, productUpdated) => {
        if (err || productUpdated === null) return statusResponse(res, 500, "error al actualizar producto", err);
        statusResponse( res, 200, "producto actualizado", null, {old_product: productUpdated,new_product: newProduct});
      });
    });
  },

  async deleteProduct(req: Request, res: Response) {

    const id = req.params.id;

    await Product.findByIdAndDelete(id, async (err, productDeleted: any) => {

      if (err || productDeleted === null) return statusResponse(res, 500, "error al eliminar producto", err);
      
      if (productDeleted.image) {
        const path = `./uploads${req.baseUrl}`;
        await fs.remove(`${path}/${productDeleted.image}`);
      }
    
      statusResponse( res, 200, "producto eliminado", null, {producto: productDeleted});

    });
  },
};

export default productsController;

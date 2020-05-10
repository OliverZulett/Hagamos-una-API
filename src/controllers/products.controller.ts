import { Request, Response } from "express";
import Product from "../models/product.model";
import { v4 as uuidv4 } from "uuid";
import fs from "fs-extra";
import { statusResponse } from '../functions/statusResponse.function';
import saveFile from "../functions/saveFile.function";

const productsController = {
  async productList(req: Request, res: Response) {
    await Product.find({}, "name image price", async (err, products) => {
      if (err) return statusResponse(res, 500, "error al buscar productos", err);
      // {
      //   return res.status(500).json({
      //     ok: false,
      //     message: "error al buscar productos",
      //     errors: err,
      //   });
      // }
      await Product.countDocuments((err, total) => {
        if (err) return statusResponse(res, 500, "error al contar productos", err);
        // {
        //   return res.status(500).json({
        //     ok: false,
        //     message: "error al contar productos",
        //     errors: err,
        //   });
        // }
        statusResponse( res, 200, "lista de productos", null, {productos: products, total_productos: total});
        // res.status(200).json({
        //   ok: true,
        //   message: "lista de productos",
        //   productos: products,
        //   total_productos: total
        // });
      });
    });
  },

  async getProductById(req: Request, res: Response) {
    const id = req.params.id;
    await Product.findById(id, (err, product:any) => {
      if (err) return statusResponse(res, 500, "error al buscar producto", err);
      if (Object.keys(product).length === 0)
        return statusResponse(res, 404, "no se encontro el producto", err);
      statusResponse( res, 200, "productos", null, {producto: product});
    });
  },

  async createProduct(req: Request, res: Response) {
    if (!req.files || Object.keys(req.files).length === 0) 
      return statusResponse(res, 400, "debe subir una imagen", {err: "debe subir una imagen"});

    let image: any = req.files.image;
    const productReceived = req.body;

    if (!productReceived || Object.keys(productReceived).length < 2)
      return statusResponse(res, 400, "parametros incompletos", {err: "parametros incompletos"});

    let fileName = "";
    if (
      image.mimetype === "image/png" ||
      image.mimetype === "image/jpeg" ||
      image.mimetype === "image/gif"
    ) {
      const path = `./uploads${req.baseUrl}`;
      const fileExtension = image.mimetype.split("/")[1];
      fileName = `${uuidv4()}.${fileExtension}`;
      saveFile(image, path, fileName, res);
      // await fs.ensureDir(path);
      // await image.mv(`${path}/${fileName}`, function (err: any) {
      //   if (err) return statusResponse(res, 500, "error al guaradar imagen", err);
      // });
    } else return statusResponse(res, 400, "el archivo no es una imagen", {err: "el archivo no es una imagen"});

    const product = new Product(productReceived);
    product.image = fileName;

    await product.save((err, newProduct) => {
      if (err) return statusResponse(res, 500, "error al guardar producto", err);
      statusResponse( res, 200, "producto creado", null, {producto: newProduct});
    });
  },

  async updateProduct(req: Request, res: Response) {
    const id = req.params.id;
    const productReceived = req.body;
    if (
      (!productReceived || Object.keys(productReceived).length === 0) &&
      (!req.files || Object.keys(req.files).length === 0)
    ) {
      return statusResponse(res, 400, "Nada que actualizar", {err: "Nada que actualizar"});
    }

    await Product.findById(id, async (err, productForUpdate: any) => {
      if (err) return statusResponse(res, 500, "error al encontrar producto", err);
      const newProduct = { ...productForUpdate._doc, ...productReceived };

      if (req.files && Object.keys(req.files).length !== 0) {
        const image: any = req.files!.image;
        if (
          image.mimetype === "image/png" ||
          image.mimetype === "image/jpeg" ||
          image.mimetype === "image/gif"
        ) {
          const path = `./uploads${req.baseUrl}`;
          const fileExtension = newProduct.image.split(".")[1];
          const fileName = `${newProduct.image.split(".")[0]}.${fileExtension}`;
          saveFile(image, path, fileName, res);
          newProduct.image = fileName;
        }
      }

      await Product.findByIdAndUpdate(id, newProduct, (err, productUpdated) => {
        if (err) return statusResponse(res, 500, "error al actualizar producto", err);
        statusResponse( res, 200, "producto actualizado", null, {old_product: productUpdated,new_producto: newProduct});
      });
    });
  },

  async deleteProduct(req: Request, res: Response) {
    const id = req.params.id;
    await Product.findByIdAndDelete(id, async (err, productDeleted: any) => {
      if (err) return statusResponse(res, 500, "error al eliminar producto", err);
      if (productDeleted.image) {
        const path = `./uploads${req.baseUrl}`;
        await fs.remove(`${path}/${productDeleted.image}`);
      }
      statusResponse( res, 200, "producto eliminado", null, {producto: productDeleted});
    });
  },
};

export default productsController;

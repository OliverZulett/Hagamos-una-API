import {Router} from 'express';
import productsController from '../controllers/products.controller';
import imageValidator from '../middlewares/imageValidator.middleware';
import passport from 'passport';
import adminAuthMiddleware from '../middlewares/adminAuth.middleware';

const productsRouter = Router();

// lista de productos
productsRouter.get('/', productsController.productList);
// obtener un producto por su id
productsRouter.get('/:id', productsController.getProductById);
// crea un nuevo producto
productsRouter.post('/', passport.authenticate('jwt', {session: false}), adminAuthMiddleware, imageValidator, productsController.createProduct);
// actualiza un producto
productsRouter.put('/:id', passport.authenticate('jwt', {session: false}), adminAuthMiddleware, imageValidator, productsController.updateProduct);
// elimina un producto
productsRouter.delete('/:id', passport.authenticate('jwt', {session: false}), adminAuthMiddleware, productsController.deleteProduct);

export default productsRouter;

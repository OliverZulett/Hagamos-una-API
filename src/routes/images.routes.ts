import {Router} from 'express';
import productsController from '../controllers/products.controller';

const iamgesRouter = Router();

// obtener imagen
iamgesRouter.get('/:type/:image', productsController.productList);

export default iamgesRouter;
import {Router} from 'express';
import imageController from '../controllers/images.controller';

const iamgesRouter = Router();

// obtener imagen
iamgesRouter.get('/:type/:image', imageController.getImage);

export default iamgesRouter;
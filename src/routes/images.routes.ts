import { Router } from 'express';
import imageController from '../controllers/images.controller';

const imageRouter = Router();

imageRouter.get('/:type/:image', imageController.getImage);

export default imageRouter;

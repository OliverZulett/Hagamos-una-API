import { Router } from 'express';
import imageController from '../controllers/images.controller';

const imageRouter = Router();

// devuelvve una imagen por typo y nombre
imageRouter.get('/:type/:image', imageController.getImage);

export default imageRouter;

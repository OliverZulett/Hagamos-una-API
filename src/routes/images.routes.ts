import { Router } from 'express';
import imageController from '../controllers/imges.controller';

const imageRouter = Router();

imageRouter.get('/:type/:image', imageController.getImage);

export default imageRouter;
import {Router} from 'express';
import ordersController from '../controllers/orders.controller';
import passport from 'passport';
import adminAuthMiddleware from '../middlewares/adminAuth.middleware';

const ordersRouter = Router();

// lista todas las ordenes
ordersRouter.get('/', passport.authenticate('jwt', {session: false}), adminAuthMiddleware, ordersController.orderList);
// obtiene una orden por su id
ordersRouter.get('/:id',passport.authenticate('jwt', {session: false}), adminAuthMiddleware, ordersController.getOrderById);
// crea una nueva orden 
ordersRouter.post('/:user_id', passport.authenticate('jwt', {session: false}), adminAuthMiddleware, ordersController.createOrder);
// actualiza una orden por su id
ordersRouter.put('/:id', passport.authenticate('jwt', {session: false}), adminAuthMiddleware, ordersController.updateOrder);
// elimina una orden por su id
ordersRouter.delete('/:id', passport.authenticate('jwt', {session: false}), adminAuthMiddleware, ordersController.deleteOrder);

export default ordersRouter;
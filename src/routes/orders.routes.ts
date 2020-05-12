import {Router} from 'express';
import ordersController from '../controllers/orders.controller';
import passport from 'passport';
import adminAuthMiddleware from '../middlewares/adminAuth.middleware';

const ordersRouter = Router();

// lista de ordenes
ordersRouter.get('/', passport.authenticate('jwt', {session: false}), adminAuthMiddleware, ordersController.orderList);
// obtener un ordenes por su id
ordersRouter.get('/:id',passport.authenticate('jwt', {session: false}), ordersController.getOrderById);
// crea un nuevo ordenes
ordersRouter.post('/:user_id', passport.authenticate('jwt', {session: false}), ordersController.createOrder);
// actualiza un ordenes
ordersRouter.put('/:id', passport.authenticate('jwt', {session: false}), ordersController.updateOrder);
// // elimina un ordenes
ordersRouter.delete('/:id', passport.authenticate('jwt', {session: false}), ordersController.deleteOrder);

export default ordersRouter;
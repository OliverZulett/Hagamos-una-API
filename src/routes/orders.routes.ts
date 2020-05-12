import {Router} from 'express';
import ordersController from '../controllers/orders.controller';

const ordersRouter = Router();

// lista de ordenes
ordersRouter.get('/', ordersController.orderList);
// obtener un ordenes por su id
ordersRouter.get('/:id', ordersController.getOrderById);
// crea un nuevo ordenes
ordersRouter.post('/:user_id', ordersController.createOrder);
// actualiza un ordenes
ordersRouter.put('/:id', ordersController.updateOrder);
// // elimina un ordenes
ordersRouter.delete('/:id', ordersController.deleteOrder);

export default ordersRouter;
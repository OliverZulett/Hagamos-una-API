import {Router} from 'express';
import usersController from '../controllers/users.controller';
import imageValidator from '../middlewares/imageValidator.middleware';

const usersRouter = Router();

// lista de usuarios
usersRouter.get('/', usersController.userList);
// obtener un usuario por su id
usersRouter.get('/:id', usersController.getUserById);
// crea un nuevo usuario
usersRouter.post('/', usersController.createUser);
// actualiza un usuario
usersRouter.put('/:id', imageValidator, usersController.updateUser);
// elimina un usuario
usersRouter.delete('/:id', usersController.deleteUser);

export default usersRouter;
import {Router} from 'express';
import usersController from '../controllers/users.controller';
import imageValidator from '../middlewares/imageValidator.middleware';
import passport from 'passport';
import adminAuthMiddleware from '../middlewares/adminAuth.middleware';

const usersRouter = Router();

// lista de usuarios
usersRouter.get('/',passport.authenticate('jwt', {session: false}), adminAuthMiddleware, usersController.userList);
// obtener un usuario por su id
usersRouter.get('/:id',passport.authenticate('jwt', {session: false}), adminAuthMiddleware, usersController.getUserById);
// crea un nuevo usuario
usersRouter.post('/', usersController.createUser);
// actualiza un usuario
usersRouter.put('/:id',passport.authenticate('jwt', {session: false}), adminAuthMiddleware, imageValidator,  usersController.updateUser);
// elimina un usuario
usersRouter.delete('/:id',passport.authenticate('jwt', {session: false}), adminAuthMiddleware, usersController.deleteUser);

export default usersRouter;
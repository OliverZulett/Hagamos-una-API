import { Request, Response } from "express";
import User from "../models/user.model";
import fs from "fs-extra";
import { statusResponse } from '../functions/statusResponse.function';
import updateFile from "../functions/updateFile.function";

const usersController = {

  async userList(req: Request, res: Response) {
    await User.find({}, "nick image email", async (err, users) => {
      if (err) return statusResponse(res, 500, "Error al buscar usuarios", err);
      if (users.length === 0) return statusResponse(res, 404, "No hay usuarios registrados", null);
      await User.countDocuments((err, total) => {
        if (err) return statusResponse(res, 500, "Error al contar usuarios", err);
        statusResponse( res, 200, "Lista de usuarios", null, {usuarios: users, total_usuarios: total});
      });
    });
  },

  async getUserById(req: Request, res: Response) {
    const id = req.params.id;
    await User.findById(id, (err, user:any) => {
      if (err) return statusResponse(res, 500, "Error al buscar usuario", err);
      if (user === null) return statusResponse(res, 404, "Usuario no encontrado", {errors: 'Id incorrecto'});
      statusResponse( res, 200, "Usuarios", null, {usuario: user});
    });
  },

  async createUser(req: Request, res: Response) {
    const userReceived = req.body;
    if (!userReceived || Object.keys(userReceived).length < 2) {
      return statusResponse(res, 400, "Parametros incompletos", null);
    }
    
    const user = new User(userReceived);

    await user.save((err, newUser) => {
      if (err) return statusResponse(res, 500, "error al guardar usuario", err);
      statusResponse( res, 200, "usuario creado", null, {usuario: newUser});
    });
  },

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    const userReceived = req.body;
    if ((!userReceived || Object.keys(userReceived).length === 0) && !(<any>req).imageExist) {
      return statusResponse(res, 400, "Nada que actualizar", {err: "Nada que actualizar"});
    }
    await User.findById(id, async (err, userForUpdate: any) => {
      if (err) return statusResponse(res, 500, "error al encontrar usuario", err);
      if (userForUpdate === null) return statusResponse(res, 404, "Usuario no encontrado", {errors: 'Id incorrecto'});

      const newUser = { ...userForUpdate._doc, ...userReceived };
      
      if ((<any>req).imageExist) {
        await updateFile(req, res, newUser.image);
        newUser.image = (<any>req).imageName;
      }
      await User.findByIdAndUpdate(id, newUser, (err, userUpdated) => {
        if (err || userForUpdate === null) return statusResponse(res, 500, "error al actualizar usuario", err);
        statusResponse( res, 200, "usuario actualizado", null, {old_user: userUpdated, new_user: newUser});
      });
    });
  },

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    await User.findByIdAndDelete(id, async (err, userDeleted: any) => {
      if (err) return statusResponse(res, 500, "error al eliminar usuario", err);
      if (userDeleted === null) return statusResponse(res, 404, "Usuario no encontrado", {errors: 'Id incorrecto'});
      if (userDeleted.image) {
        const path = `./uploads${req.baseUrl}`;
        await fs.remove(`${path}/${userDeleted.image}`);
      }
      statusResponse( res, 200, "usuario eliminado", null, {usuario: userDeleted});
    });
  },
};

export default usersController;

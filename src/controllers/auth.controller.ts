import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import createToken from "../functions/createToken.function";
import { statusResponse } from '../functions/statusResponse.function';

export const singUp = async (req: Request, res: Response) => {

  const userReceived = req.body;

  if (!userReceived || Object.keys(userReceived).length < 2) {
    return statusResponse(res, 400, "parametros incompletos", {
      err: "parametros incompletos",
    });
  }

  const user = new User(userReceived);

  await user.save((err, newUser) => {
    if (err) return statusResponse(res, 500, "error al guardar usuario", err);
    statusResponse(res, 200, "usuario creado", null, { usuario: newUser });
  });

};

export const singIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return statusResponse(res, 400, "parametros admitidos: password, email", {
      err: "parametros admitidos: password, email",
    });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return statusResponse(res, 400, "el usuario no existe", {
      err: "el usuario no existe",
    });
  }

  const isMatch = await user.comparePassword(req.body.password);

  if (!isMatch) {
    return statusResponse(res, 400, "login incorrecto", {
      err: "the email or password are incorrect",
    });
  }
  createToken(user).then((tkn) => {
    statusResponse(res, 400, "login correcto", null, { token: tkn });
  }).catch( err => {
    return statusResponse(res, 500, 'error al crear token', err);
  });
};

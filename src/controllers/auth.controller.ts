import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import createToken from "../functions/createToken.function";
import { statusResponse } from '../functions/statusResponse.function';

export const singUp = async (req: Request, res: Response) => {
  // export const singUp = async (req:Request, res:Response):Promise<Response> => {
  // if (!req.body.email || !req.body.password) {
  //     return res.status(400).json(
  //         {
  //             msg: 'please, send your email and password'
  //         }
  //     );
  // }
  // const user = await User.findOne({email: req.body.email})
  // console.log(user);

  // if (user) {
  //     return res.status(400).json(
  //         {
  //             msg: 'The user already exists'
  //         }
  //     );
  // }
  // const newUser = new User(req.body);
  // await newUser.save();
  // return res.status(400).json(newUser);

  const userReceived = req.body;
  // console.log(userReceived);

  if (!userReceived || Object.keys(userReceived).length < 2) {
    return statusResponse(res, 400, "parametros incompletos", {
      err: "parametros incompletos",
    });
  }

  // userReceived.password = bcrypt.hashSync(userReceived.password, 10);

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
    // return res.status(400).json({msg: 'the user does not exists'});
  }

  const isMatch = await user.comparePassword(req.body.password);

  if (!isMatch) {
    return statusResponse(res, 400, "login incorrecto", {
      err: "the email or password are incorrect",
    });
  }
  createToken(user).then((tkn) => {
    // console.log(tkn);
    statusResponse(res, 400, "login correcto", null, { token: tkn });
  }).catch( err => {
    return statusResponse(res, 500, 'error al crear token', err);
  });
};

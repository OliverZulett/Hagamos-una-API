import config from "../config/config";
import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

export default async function createToken(user: IUser) {
  return await jwt.sign({ id: user._id, email: user.email, role: user.role }, config.JWTSECRET, {
    expiresIn: 86400,
  });
}

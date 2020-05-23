import { statusResponse } from '../functions/statusResponse.function';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export default function (req: Request, res: Response, next: NextFunction) {

  const authHeader:string = req.headers.authorization as string;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return statusResponse(res, 400, '', { err: 'token invalido' });
  }
  
  const token: string = authHeader.split(' ')[1] || '*';
  const user: IUser = jwt.decode(token) as IUser;
  
  if (user.role === 'ADMIN_ROLE') {
    return next();
  } else if (user.id === req.params.id || user.id === req.params.user_id) {
    return next();
  } else {
    return statusResponse(res, 401, '', { err: 'usuario no autorizado' });
  }

}

import { statusResponse } from '../functions/statusResponse.function';
import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {

  if ((<any>req).user.role !== 'ADMIN_ROLE') {
    return statusResponse(res, 500, 'acceso denegado', {error: 'necestia ser administrador para realizar la operacion'});
  } 
  
  next();

}

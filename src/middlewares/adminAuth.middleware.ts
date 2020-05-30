import { statusResponse } from '../functions/statusResponse.function';
import { Request, Response, NextFunction } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  if ((<any>req).user.role === 'ADMIN_ROLE') {
    return next();
  } else if ((<any>req).user.id === req.params.id || (<any>req).user.id === req.params.user_id) {
    return next();
  } else {
    return statusResponse(res, 401, '', { err: 'usuario no autorizado' });
  }
}

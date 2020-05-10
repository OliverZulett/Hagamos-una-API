import { Response } from "express";

export function statusResponse(
  res: Response,
  code: number,
  message: string = "",
  errors: any,
  object?: Object
) {
  const response: object = {};
  if (errors) {
    Object.assign(response, { ok: false });
    Object.assign(response, { errors: errors });
  }
  if (message.length > 0) {
    Object.assign(response, { message: message });
  }
  if (object) {
    Object.assign(response, object);
  }
  res.status(code).json(response);
}

import {Response} from 'express';


export function statusResponse(res: Response, code: number, message: string = '', error: any, object?: Object) {
    const response: Object = {};
    if (error) {
        Object.assign(response, { ok:false });
        Object.assign(response, { errors: error});
    } else {
        Object.assign(response, { ok:true });
    } 
    if (message.length > 0) {
        Object.assign(response, { mensaje: message });
    }
    if (object) {
        Object.assign(response, object);
    }
    res.status(code).json(response);
}
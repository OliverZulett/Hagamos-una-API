import { Request, Response, NextFunction } from 'express';
import { statusResponse } from '../functions/statusResponse.function';
import { v4 as uuidv4 } from 'uuid';

export function imageValidator(req: Request, res: Response, next: NextFunction) {

    if (!req.files || Object.keys(req.files).length === 0) {
        if (req.method === 'POST') {
            return statusResponse(res, 400, 'debe subir una imagen', null);
        } else if (req.method === 'PUT') {
            return next();
        }
    }

    let image:any = req.files!.image;
    
    if (image.mimetype === 'image/png' || image.mimetype === 'image/jpeg' ||  image.mimetype === 'image/gif') {

        const path = `./uploads${req.baseUrl}`;
        const fileExtension = image.mimetype.split('/')[1];
        const fileName = `${uuidv4()}.${fileExtension}`;

        (<any>req).pathToSaveImage = path;
        (<any>req).imageName = fileName;
        (<any>req).imageExtension = fileExtension;
        (<any>req).imageExist = 'true';
        
    } else {
        return statusResponse(res, 400, 'el archivo no es una imagen', null);
    }

    next();
}
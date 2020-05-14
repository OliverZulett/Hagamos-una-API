import { statusResponse } from "./statusResponse.function";
import fs from 'fs-extra';
import { Response, Request } from 'express';

export async function saveFile(req:Request, res:Response) {
    
    const image: any = req.files!.image;
    const path = (<any>req).pathToSaveImage;
    const fileName = (<any>req).imageName;
    await fs.ensureDir(path);
    await image.mv(`${path}/${fileName}`, function (err: any) {
        if (err) {
            return statusResponse(res, 500, 'error al guaradar imagen', err);
        }
    });
}

import { statusResponse } from "./statusResponse.function";
import fs from 'fs-extra';
import { Response, Request } from 'express';

export async function updateFile(req:Request, res:Response, imageName: string) {

    const image: any = req.files!.image;
    const path = (<any>req).pathToSaveImage;
    const fileExtension = (<any>req).imageExtension;

    let fileName = '';
    if (await fs.pathExists(`${path}/${imageName}`)) {
        await fs.remove(`${path}/${imageName}`);
        fileName = `${imageName.split(".")[0]}.${fileExtension}`;
        (<any>req).imageName = fileName;
    } else {
        await fs.ensureDir(path);
        fileName = (<any>req).imageName;
    }

    await image.mv(`${path}/${fileName}`, function (err: any) {
        if (err) {
            return statusResponse(res, 500, 'error al guaradar imagen', err);
        }
    });
}

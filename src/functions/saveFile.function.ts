import {Response} from 'express';
import fs from 'fs-extra';
import { statusResponse } from './statusResponse.function';

export default async function saveFile(image:any, path:string, fileName:string, res:Response) {
    await fs.ensureDir(path);
    await image.mv(`${path}/${fileName}`, function (err: any) {
      if (err) return statusResponse(res, 500, "error al guaradar imagen", err);
    });
}
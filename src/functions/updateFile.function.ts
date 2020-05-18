import { Response, Request } from "express";
import fs from "fs-extra";
import { statusResponse } from "./statusResponse.function";

export default async function updateFile(
  req: Request,
  res: Response,
  imageName: string
) {
  let image: any = req.files!.image;
  const path = (<any>req).pathToSaveImage;
  const fileExtension = (<any>req).imageExtention;

  let fileName = "";

  if (await fs.pathExists(`${path}/${imageName}`)) {
    await fs.remove(`${path}/${imageName}`);
    fileName = `${imageName.split(".")[0]}.${fileExtension}`;
    (<any>req).imageName = fileName;
  } else {
    await fs.ensureDir(path);
    fileName = (<any>req).imageName;
  }

  await image.mv(`${path}/${fileName}`, function (err: any) {
    if (err) return statusResponse(res, 500, "error al guardar imagen", err);
  });
}

import {Request, Response} from 'express';
import path from 'path';
import fs from 'fs-extra';

const imageController = {

    async getImage (req:Request, res:Response){
        const type = req.params.type;
        const image = req.params.image;
        const pathImage = path.resolve( __dirname, `../../uploads/${type}/${image}`);
        if (await fs.existsSync(pathImage)) {
            res.sendFile(pathImage);
        } else {
            let pathNoImage: string = '';
            if (type === 'products') {
                pathNoImage = path.resolve( __dirname, `../assets/product-default.png`);
            } else if (type === 'users') {
                pathNoImage = path.resolve( __dirname, `../assets/user-default.png`);
            } else {
                pathNoImage = path.resolve( __dirname, `../assets/no-image.png`);
            }
            res.sendFile(pathNoImage);
        }
    }
}

export default imageController;

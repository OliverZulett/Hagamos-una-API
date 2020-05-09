"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const imageController = {
    getImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.params.type;
            const image = req.params.image;
            const pathImage = path_1.default.resolve(__dirname, `../../uploads/${type}/${image}`);
            if (yield fs_extra_1.default.existsSync(pathImage)) {
                res.sendFile(pathImage);
            }
            else {
                const pathNoImage = path_1.default.resolve(__dirname, '../../uploads/no-image.png');
                res.sendFile(pathNoImage);
            }
        });
    }
};
exports.default = imageController;

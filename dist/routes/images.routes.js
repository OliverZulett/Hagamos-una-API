"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_controller_1 = __importDefault(require("../controllers/images.controller"));
const iamgesRouter = express_1.Router();
// obtener imagen
iamgesRouter.get('/:type/:image', images_controller_1.default.getImage);
exports.default = iamgesRouter;

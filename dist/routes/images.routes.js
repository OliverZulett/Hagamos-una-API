"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imges_controller_1 = __importDefault(require("../controllers/imges.controller"));
const imageRouter = express_1.Router();
imageRouter.get('/:type/:image', imges_controller_1.default.getImage);
exports.default = imageRouter;

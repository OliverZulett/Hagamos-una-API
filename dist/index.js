"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("./database");
app_1.default.listen(app_1.default.get('port'));
console.log(`El servidor se esta ejecutando en el puerto: ${app_1.default.get('port')}`);

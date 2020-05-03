"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
mongoose_1.default.connect(process.env.MONGO_DB_URL || config_1.default.DB.LOCAL_DB, dbOptions);
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('Conexion establecida con MongoDB en el puerto: 27017');
});
connection.on('error', err => {
    console.log('hubo un error de conexion con mongo: ', err);
    process.exit(0);
});

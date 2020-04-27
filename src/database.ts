import mongoose, {ConnectionOptions} from 'mongoose';
import config from './config/config';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect( process.env.MONGO_DB_URL || config.DB.LOCAL_DB, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log( 'Conexion establecida con MongoDB en el puerto: 27017');
});

connection.on('error', err => {
    console.log('hubo un error de conexion con mongo: ', err);
    process.exit(0);
});
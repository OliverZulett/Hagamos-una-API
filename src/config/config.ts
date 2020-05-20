export default {
    // Define una firma para generar json web tokens
    JWTSECRET: process.env.JWT_SECRET || 'mi-klave-secreta',
    DB: {
        // Define la url de conexion a tu DB
        LOCAL_DB: 'mongodb://admin:admin@localhost:27017/bakeryStoreDB',
        // tambien puedes definir una URl para conectar con MongoDB Atlas
        ATLAS_DB: ''
    }
}
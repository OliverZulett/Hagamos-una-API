export default {
    JWTSECRET: process.env.JWT_SECRET || 'mi-klave-secreta',
    DB: {
        LOCAL_DB: 'mongodb://admin:admin@localhost:27017/bakeryStoreDB',
        ATLAS_DB: ''
    }
}
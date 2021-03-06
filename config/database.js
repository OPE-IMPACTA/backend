const uri = process.env.MONGODB_PRODUCTION || `mongodb://${process.env.HOST_MONGODB}:${process.env.PORT_MONGODB}/${process.env.DATABASE_MONGODB}`
const user = process.env.MONGODB_USER_PRODUCTION || process.env.MONGO_INITDB_ROOT_USERNAME
const password = process.env.MONGODB_PASSWORD_PRODUCTION || process.env.MONGO_INITDB_ROOT_PASSWORD

module.exports = {
    uri: uri,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10, // Manter 10 sockets de conex�o
        serverSelectionTimeoutMS: 5000, // Tenta enviar opera��o por 5 segundos antes de dar timeout
        socketTimeoutMS: 45000, // Fecha conex�o depois de 45 segundos inativo
        family: 4, // Usa IPv4, pulando tentativa de uso do IPv6
        auth: {
            authSource: 'admin'
        },
        user: user,
        pass: password,
    }
};

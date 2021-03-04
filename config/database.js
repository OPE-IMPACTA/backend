module.exports = {
    uri: `mongodb://${process.env.HOST_MONGODB}:${process.env.PORT_MONGODB}/${process.env.DATABASE_MONGODB}`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10, // Manter 10 sockets de conexão
        serverSelectionTimeoutMS: 5000, // Tenta enviar operação por 5 segundos antes de dar timeout
        socketTimeoutMS: 45000, // Fecha conexão depois de 45 segundos inativo
        family: 4, // Usa IPv4, pulando tentativa de uso do IPv6
        auth: {
            authSource: 'admin'
        },
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    }
};

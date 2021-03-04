const mongoose = require('mongoose');
const config = require('./../config/database');

module.exports = {

    load: () => {
        mongoose.connect(`${config.uri}`, config.options);

        const connection = mongoose.connection;

        connection.once("open", function() {
            console.log("MongoDB database connection established successfully");
        });

        connection.on('error', console.error.bind(console, 'connection error:'));
    }
};

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");

// Kernel
const loadsys = require('./kernel/loadsys');
const routes = require('./kernel/routes');
const database = require('./kernel/database');

// Global
global.SystemLoad = loadsys;

// Settings
app.use(cors({origin: process.env.ENDPOINT_APP_ORIGIN, exposedHeaders: ['Authorization']}));
app.use(logger('dev'));
app.use(express.json());

routes.load(app);
database.load();

const swaggerOptions = require('./config/swagger');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;

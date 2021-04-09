const { 
    loginParameters,
    userParameters,
    clientParameters,
    projectParameters
} = require('./parameters')


const {
    badRequest,
    serverError,
    unauthorized,
    error,
    loginResponses,
    usersResponses,
    clientsResponses,
    projectsResponses
} = require('./responses')

module.exports = {
    swaggerDefinition: {
        "openapi": "3.0.3",
        "info": {
            "version": "1.0.0",
            "title": "Projeto da OPE GAP",
            "description": "OPE GAP API",
            "license": {
                "name": "MIT",
                "url": "https://opensource.org/licenses/MIT"
            }
        },
        "host": "localhost:3000",
        "basePath": "/",
        "tags": [
            {
                "name": "Auth",
                "description": "Autenticação do sistema"
            }, {
                "name": "User",
                "description": "CRUD de usuários"
            }, {
                "name": "Client",
                "description": "CRUD de clientes"
            }
        ],
        "schemes": [
            "http"
        ],
        "responses": {
            badRequest,
            serverError,
            unauthorized,
            error,
            loginResponses,
            usersResponses,
            clientsResponses,
            projectsResponses
        },
        "parameters": {
            userParameters,
            clientParameters,
            projectParameters,
            "requestTask": {
                "required": [
                    "projectId",
                    "userId",
                    "description",
                    "startDate",
                    "endDate",
                    "hours",
                ],
                "properties": {
                    "projectId": {
                        "type": "stringmodule"
                    },
                    "userId": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "startDate": {
                        "type": "string"
                    },
                    "endDate": {
                        "type": "string"
                    },
                    "hours": {
                        "type": "number"
                    },
                }
            },
            loginParameters,
        },
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "name": "bearerAuth",
                    "in": "header",
                    "bearerFormat": "JWT",
                    "scheme": "bearer"
                }
            }
        },
        "definitions": {
            "responseLogin": {
                "properties": {
                    "_id": {
                        "type": "string",
                        "uniqueItems": true
                    },
                    "name": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

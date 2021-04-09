const { 
    loginParameters,
    userParameters,
    clientParameters,
    projectParameters,
    taskParameters
} = require('./parameters')


const {
    badRequest,
    serverError,
    unauthorized,
    error,
    loginResponses,
    usersResponses,
    clientsResponses,
    projectsResponses,
    tasksResponses
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
            }, {
                "name": "Project",
                "description": "CRUD de projetos"
            }, {
                "name": "Task",
                "description": "CRUD de tarefas"
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
            projectsResponses,
            tasksResponses
        },
        "parameters": {
            userParameters,
            clientParameters,
            projectParameters,
            taskParameters,
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
        }
    },
    apis: ["./routes/*.js"]
};

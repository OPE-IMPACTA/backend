module.exports = {
    swaggerDefinition: {
        "openapi": "3.0.3",
        "info": {
            "version": "1.0.0",
            "title": "Project Super E2E",
            "description": "My Project Application API",
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
            },
            {
                "name": "User",
                "description": "CRUD de usuários"
            },
            {
                "name": "Clients",
                "description": "CRUD de clientes"
            }
        ],
        "schemes": [
            "http"
        ],
        "parameters": {
            "requestClients": {
                "required": [
                    "name",
                    "office"
                ],
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "office": {
                        "type": "string",
                    }
                }
            },
            "requestProjects": {
                "required": [
                    "name",
                    "office"
                ],
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "office": {
                        "type": "string",
                    }
                }
            },
            "requestLogin": {
                "required": [
                    "email",
                    "password"
                ],
                "properties": {
                    "email": {
                        "type": "string",
                        "default": "master@master.com"
                    },
                    "password": {
                        "type": "string",
                        "default": "12345678"
                    }
                }
            },
            "requestUpdatesHelp": {
                "required": [
                    "items"
                ],
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "field": {
                            "type": "string",
                            "default": "newField"
                        },
                        "action": {
                            "type": "string",
                            "default": "newAction"
                        }
                    }
                }
            },
            "requestCreatesUser": {
                "required": [
                    "email",
                    "password",
                    "group_id"
                ],
                "properties": {
                    "email": {
                        "type": "string",
                        "default": "master2@master.com"
                    },
                    "password": {
                        "type": "string",
                        "default": "12345678"
                    },
                    "group_id": {
                        "type": "string",
                        "default": "Hash do group_id"
                    }
                }
            },
            "requestUpdatesUser": {
                "required": [
                    "id",
                    ["name"],
                    ["password"],
                    ["group_id"]
                ],
                "properties": {
                    "id": {
                        "type": "string",
                        "default": "Hash do usuário que será alterado aqui"
                    },
                    "data": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string",
                                "default": "Master 2"
                            },
                            "password": {
                                "type": "string",
                                "default": "12345678"
                            },
                            "group_id": {
                                "type": "string",
                                "default": "Hash do group_id que o usuário pertence"
                            }
                        }
                    }
                }
            },
            "requestTests": {
                "required": [
                    "title",
                    "project",
                    "description",
                    "url",
                    "operations"
                ],
                "properties": {
                    "title": {
                        "type": "string",
                        "default": "Título"
                    },
                    "project": {
                        "type": "string",
                        "default": "Projeto"
                    },
                    "description": {
                        "type": "string",
                        "default": "Descrição"
                    },
                    "url": {
                        "type": "string",
                        "default": "www.super-e2e.com.br"
                    },
                    "operations": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "click": {
                                    "type": "string",
                                    "default": "Clique"
                                },
                                "wait": {
                                    "type": "string",
                                    "default": "Esperar"
                                },
                                "fill": {
                                    "type": "object",
                                    "properties": {
                                        "class": {
                                            "type": "string",
                                            "default": "Preencher (classe)"
                                        },
                                        "value": {
                                            "type": "string",
                                            "default": "Preencher (valor)"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "responseTests": {
                "properties": {
                    "status": {
                        "type": "string",
                        "uniqueItems": true
                    },
                    "operations": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "click": {
                                    "type": "string"
                                },
                                "wait": {
                                    "type": "string"
                                },
                                "fill": {
                                    "type": "object",
                                    "properties": {
                                        "class": {
                                            "type": "string"
                                        },
                                        "value": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "_id": {
                        "type": "string",
                        "uniqueItems": true
                    },
                    "user_id": {
                        "type": "string",
                        "uniqueItems": true
                    },
                    "title": {
                        "type": "string"
                    },
                    "project": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "url": {
                        "type": "string"
                    },
                    "created_at": {
                        "type": "string"
                    },
                    "update_at": {
                        "type": "string"
                    },
                    "__v": {
                        "type": "integer"
                    }
                }
            },
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

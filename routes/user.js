const { Router } = require('express');
const acl = require('express-acl');
const router = new Router();

const UserController = SystemLoad.controller('UserController');
const UserRequest = SystemLoad.request('UserRequest');
const AuthenticationMiddleware = SystemLoad.middleware('AuthenticationMiddleware');

/**
 * @swagger
 * /users:
 *    get:
 *      tags:
 *      - User
 *      description: Lista de usuários
 *      responses:
 *        '200':
 *          description: Accept
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.get('/', AuthenticationMiddleware.bearer, acl.authorize, function (request, response, next) {
    UserController.index(request, response);
});

/**
 * @swagger
 * /users/search/{name}:
 *    get:
 *      tags:
 *      - User
 *      description: Busca o usuário pelo nome
 *      parameters:
 *        - in: path
 *          name: name
 *          type: string
 *          required: true
 *          default: "Nome do usuário"
 *      responses:
 *        '200':
 *          description: Accept
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.get('/search/:name', AuthenticationMiddleware.bearer, acl.authorize, UserRequest.checkNameLength, function (request, response, next) {
    UserController.search(request, response);
});

/**
 * @swagger
 * /users:
 *    post:
 *      tags:
 *      - User
 *      description: Cria um novo usuário
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestCreatesUser'
 *      responses:
 *        '200':
 *          description: Accept
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.post('/', AuthenticationMiddleware.bearer, acl.authorize, UserRequest.create, function (request, response, next) {
    UserController.store(request, response);
});

/**
 * @swagger
 * /users:
 *    put:
 *      tags:
 *      - User
 *      description: Altera um usuário
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestUpdatesUser'
 *      responses:
 *        '200':
 *          description: Accept
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.put('/', AuthenticationMiddleware.bearer, acl.authorize, UserRequest.update, function (request, response, next) {
    UserController.update(request, response);
});

/**
 * @swagger
 * /users/{id}:
 *    delete:
 *      tags:
 *      - User
 *      description: Deleta o usuário pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do usuário"
 *      responses:
 *        '200':
 *          description: Accept
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.delete('/:id', AuthenticationMiddleware.bearer, acl.authorize, function (request, response, next) {
    UserController.delete(request, response);
});

module.exports = router;

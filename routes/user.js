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
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/usersResponses'
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/badRequest'
 *        '401':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/unauthorized'
 *        '500':
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/serverError'
 *      security:
 *        - bearerAuth: []
 */
router.get('/', AuthenticationMiddleware.bearer, acl.authorize, function (request, response, next) {
    UserController.index(request, response);
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
 *              $ref: '#/parameters/userParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/userResponses'
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/badRequest'
 *        '401':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/unauthorized'
 *        '500':
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/serverError'
 *      security:
 *        - bearerAuth: []
 */
router.post('/', AuthenticationMiddleware.bearer, acl.authorize, UserRequest.create, UserRequest.checkEmailInUse, function (request, response, next) {
    UserController.store(request, response);
});

/**
 * @swagger
 * /users/{id}:
 *    put:
 *      tags:
 *      - User
 *      description: Altera um usuário
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do usuário"
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/userParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/userResponses'
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/badRequest'
 *        '401':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/unauthorized'
 *        '500':
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/serverError'
 *      security:
 *        - bearerAuth: []
 */
router.put('/:id', AuthenticationMiddleware.bearer, acl.authorize, UserRequest.checkIdUser, UserRequest.checkEmailInUse, UserRequest.update, function (request, response, next) {
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
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/serverError'
 *        '400':
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/badRequest'
 *        '401':
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/unauthorized'
 *        '500':
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/serverError'
 *      security:
 *        - bearerAuth: []
 */
router.delete('/:id', AuthenticationMiddleware.bearer, acl.authorize, UserRequest.checkIdUser, function (request, response, next) {
    UserController.delete(request, response);
});

module.exports = router;

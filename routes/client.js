const { Router } = require('express');
const acl = require('express-acl');
const router = new Router();

const ClientController = SystemLoad.controller('ClientController');
const ClientRequest = SystemLoad.request('ClientRequest');
const AuthenticationMiddleware = SystemLoad.middleware('AuthenticationMiddleware');

/**
 * @swagger
 * /clients:
 *    get:
 *      tags:
 *      - Client
 *      description: Lista de clientes
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/clientsResponses'
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
router.get('/', AuthenticationMiddleware.bearer, function (request, response, next) {
    ClientController.index(request, response);
});

/**
 * @swagger
 * /clients:
 *    post:
 *      tags:
 *      - Client
 *      description: Cria um novo cliente
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/clientParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/clientsResponses'
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
router.post('/', AuthenticationMiddleware.bearer, ClientRequest.create, function (request, response, next) {
    ClientController.store(request, response);
});

/**
 * @swagger
 * /clients/{id}:
 *    put:
 *      tags:
 *      - Client
 *      description: Altera um cliente
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do cliente"
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/clientParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/clientsResponses'
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
router.put('/:id', AuthenticationMiddleware.bearer, ClientRequest.checkIdClient, ClientRequest.update, function (request, response, next) {
    ClientController.update(request, response);
});

/**
 * @swagger
 * /clients/{id}:
 *    delete:
 *      tags:
 *      - Client
 *      description: Deleta o cliente pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do cliente"
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
router.delete('/:id', AuthenticationMiddleware.bearer, ClientRequest.checkIdClient, function (request, response, next) {
    ClientController.delete(request, response);
});

module.exports = router;

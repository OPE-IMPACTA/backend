const express = require('express');
const router = express.Router();

const AuthenticationMiddleware = SystemLoad.middleware('AuthenticationMiddleware');
const HelpMiddleware = SystemLoad.middleware('HelpMiddleware');
const HelpController = SystemLoad.controller('HelpController');
const { ArrayValidFields, ValidField, ValidFieldInUse } = SystemLoad.request('HelpRequest');

/**
 * @swagger
 * /help/actions:
 *    get:
 *      tags:
 *      - Help
 *      description: Listar todas as actions
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.get('/actions', AuthenticationMiddleware.bearer, function (request, response, next) {
    HelpController.index(request, response);
});

/**
 * @swagger
 * /help/actions/{id}:
 *    get:
 *      tags:
 *      - Help
 *      description: Listar uma action pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID da action"
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.get('/actions/:id', AuthenticationMiddleware.bearer, function (request, response, next) {
    HelpController.get(request, response);
});


/**
 * @swagger
 * /help/actions:
 *    post:
 *      tags:
 *      - Help
 *      description: Criar uma action
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestUpdatesHelp'
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.post('/actions', AuthenticationMiddleware.bearer, HelpMiddleware.toArray, ArrayValidFields(), ValidFieldInUse(), function (request, response, next) {
    HelpController.create(request, response);
});

/**
 * @swagger
 * /help/actions/{id}:
 *    put:
 *      tags:
 *      - Help
 *      description: Atualizar uma action pelo ID
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                action
 *              properties:
 *                action:
 *                  type: string
 *                  default: "Alterando campo"
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID da action"
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.put('/actions/:id', AuthenticationMiddleware.bearer, ValidField(), function (request, response, next) {
    HelpController.update(request, response);
});

/**
 * @swagger
 * /help/actions/{id}:
 *    delete:
 *      tags:
 *      - Help
 *      description: Excluir uma action pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID da action"
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.delete('/actions/:id', AuthenticationMiddleware.bearer, function (request, response, next) {
    HelpController.delete(request, response);
});

module.exports = router;

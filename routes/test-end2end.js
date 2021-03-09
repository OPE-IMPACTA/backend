const express = require('express');
const router = express.Router();

const AuthenticationMiddleware = SystemLoad.middleware('AuthenticationMiddleware');
const TestController = SystemLoad.controller('TestController');
const { ValidField, ValidFieldUpdate, idTestExist  } = SystemLoad.request('TestRequest');

/**
 * @swagger
 * /tests:
 *    get:
 *      tags:
 *      - Tests
 *      description: Listas todos os testes
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
router.get('/', AuthenticationMiddleware.bearer, function (request, response, next) {
    TestController.index(request, response);
});

/**
 * @swagger
 * /tests/{id}:
 *    get:
 *      tags:
 *      - Tests
 *      description: Busca um teste pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do teste"
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
router.get('/:id', AuthenticationMiddleware.bearer, function (request, response, next) {
    TestController.get(request, response);
});

/**
 * @swagger
 * /tests/submit/{id}:
 *    post:
 *      tags:
 *      - Tests
 *      description: Enviar o teste para a fila
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do teste"
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
router.post('/submit/:id', AuthenticationMiddleware.bearer, idTestExist(), function (request, response, next) {
    TestController.submitById(request, response);
});

/**
 * @swagger
 * /tests:
 *    post:
 *      tags:
 *      - Tests
 *      description: Cria um novo teste
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestTests'
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
router.post('/', AuthenticationMiddleware.bearer, ValidField(), function (request, response, next) {
    TestController.create(request, response);
});

/**
 * @swagger
 * /tests/{id}:
 *    put:
 *      tags:
 *      - Tests
 *      description: Altera o teste pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do teste"
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestTests'
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
router.put('/:id', AuthenticationMiddleware.bearer, ValidFieldUpdate(), function (request, response, next) {
    TestController.update(request, response);
});

/**
 * @swagger
 * /tests/{id}:
 *    delete:
 *      tags:
 *      - Tests
 *      description: Deleta o teste pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do teste"
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
router.delete('/:id', AuthenticationMiddleware.bearer, function (request, response, next) {
    TestController.delete(request, response);
});

module.exports = router;

const { Router } = require('express');
const acl = require('express-acl');
const router = new Router();

const TaskController = SystemLoad.controller('TaskController');
const TaskRequest = SystemLoad.request('TaskRequest');
const AuthenticationMiddleware = SystemLoad.middleware('AuthenticationMiddleware');

/**
 * @swagger
 * /tasks:
 *    get:
 *      tags:
 *      - Task
 *      description: Lista de tarefas
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/tasksResponses'
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
    TaskController.index(request, response);
});

/**
 * @swagger
 * /tasks:
 *    post:
 *      tags:
 *      - Task
 *      description: Cria uma nova tarefa
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/taskParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/tasksResponses'
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
router.post('/', AuthenticationMiddleware.bearer, TaskRequest.checkIdUser, TaskRequest.checkIdProject, TaskRequest.create, function (request, response, next) {
    TaskController.store(request, response);
});

/**
 * @swagger
 * /tasks/{id}:
 *    put:
 *      tags:
 *      - Task
 *      description: Altera uma tarefa
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
 *              $ref: '#/parameters/taskParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/tasksResponses'
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
router.put('/:id', AuthenticationMiddleware.bearer, TaskRequest.checkIdTask, TaskRequest.checkIdUser, TaskRequest.checkIdProject, TaskRequest.update, function (request, response, next) {
    TaskController.update(request, response);
});

/**
 * @swagger
 * /clients/{id}:
 *    delete:
 *      tags:
 *      - Task
 *      description: Deleta a tarefa pelo ID
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
router.delete('/:id', AuthenticationMiddleware.bearer, TaskRequest.checkIdTask, function (request, response, next) {
    TaskController.delete(request, response);
});

module.exports = router;

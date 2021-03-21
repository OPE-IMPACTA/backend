const express = require('express');
const router = express.Router();

const TaskController = SystemLoad.controller('TaskController');
const TaskRequest = SystemLoad.request('TaskRequest');

/**
 * @swagger
 * /task:
 *    post:
 *      tags:
 *      - Task
 *      description: Criar uma atividade 
 *      requestBody: 
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestTask'
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *        '500':
 *          description: Server Error
 */
router.post('/', TaskRequest.create, function (request, response, next) {
    TaskController.create(request, response);
});

/**
 * @swagger
 * /task:
 *    get:
 *      tags:
 *      - Task
 *      description: Listar as atividades 
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *        '500':
 *          description: Server Error
 */
 router.get('/', function (request, response, next) {
    TaskController.getAll(request, response);
});

/**
 * @swagger
 * /task/{id}:
 *    put:
 *      tags:
 *      - Task
 *      description: Alterar uma atividade pelo ID
 *      requestBody: 
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestTask'
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *        '500':
 *          description: Server Error
 */
 router.put('/:id', TaskRequest.update, function (request, response, next) {
    TaskController.update(request, response);
});

/**
 * @swagger
 * /task/{id}:
 *    delete:
 *      tags:
 *      - Task
 *      description: Deletar uma task pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *        '500':
 *          description: Server Error
 */
 router.delete('/:id', function (request, response, next) {
    TaskController.delete(request, response);
});

module.exports = router;


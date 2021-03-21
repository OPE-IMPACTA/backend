const express = require('express');
const router = express.Router();

const ProjectsController = SystemLoad.controller('ProjectsController');
const ProjectsRequest = SystemLoad.request('ProjectsRequest');

/**
 * @swagger
 * /projects:
 *    post:
 *      tags:
 *      - Projects
 *      description: Criar um projeto 
 *      requestBody: 
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestProjects'
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
router.post('/', ProjectsRequest.create, function (request, response, next) {
    ProjectsController.create(request, response);
});

/**
 * @swagger
 * /projects:
 *    get:
 *      tags:
 *      - Projects
 *      description: Listar os projetos 
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
    ProjectsController.getAll(request, response);
});

/**
 * @swagger
 * /projects/{id}:
 *    put:
 *      tags:
 *      - Projects
 *      description: Alterar um projeto pelo ID
 *      requestBody: 
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestProjects'
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
 router.put('/:id', ProjectsRequest.update, function (request, response, next) {
    ProjectsController.update(request, response);
});

/**
 * @swagger
 * /projects/{id}:
 *    delete:
 *      tags:
 *      - Projects
 *      description: Deletar um projeto pelo ID
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
    ProjectsController.delete(request, response);
});

module.exports = router;


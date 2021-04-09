const { Router } = require('express');
const acl = require('express-acl');
const router = new Router();

const ProjectController = SystemLoad.controller('ProjectController');
const ProjectRequest = SystemLoad.request('ProjectRequest');
const AuthenticationMiddleware = SystemLoad.middleware('AuthenticationMiddleware');

/**
 * @swagger
 * /projects:
 *    get:
 *      tags:
 *      - Project
 *      description: Lista de projetos
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/projectsResponses'
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
    ProjectController.index(request, response);
});

/**
 * @swagger
 * /projects:
 *    post:
 *      tags:
 *      - Project
 *      description: Cria um novo projeto
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/projectParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/projectsResponses'
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
router.post('/', AuthenticationMiddleware.bearer, ProjectRequest.create, ProjectRequest.checkIdUser, ProjectRequest.checkIdClient, function (request, response, next) {
    ProjectController.store(request, response);
});

/**
 * @swagger
 * /projects/{id}:
 *    put:
 *      tags:
 *      - Project
 *      description: Altera um projeto
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do projeto"
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/projectParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/projectsResponses'
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
router.put('/:id', AuthenticationMiddleware.bearer, ProjectRequest.checkIdProject, ProjectRequest.checkIdUser, ProjectRequest.checkIdClient, ProjectRequest.update, function (request, response, next) {
    ProjectController.update(request, response);
});

/**
 * @swagger
 * /projects/{id}:
 *    delete:
 *      tags:
 *      - Project
 *      description: Deleta o projeto pelo ID
 *      parameters:
 *        - in: path
 *          name: id
 *          type: string
 *          required: true
 *          default: "ID do projeto"
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
router.delete('/:id', AuthenticationMiddleware.bearer, ProjectRequest.checkIdProject, function (request, response, next) {
    ProjectController.delete(request, response);
});

module.exports = router;

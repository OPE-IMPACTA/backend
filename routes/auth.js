const express = require('express');
const router = express.Router();

const AuthController = SystemLoad.controller('AuthController');
const AuthenticationMiddleware = SystemLoad.middleware('AuthenticationMiddleware');
const AuthRequest = SystemLoad.request('AuthRequest');

/**
 * @swagger
 * /auth/login:
 *    post:
 *      tags:
 *      - Auth
 *      description: Autenticação de usuário
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/loginParameters'
 *      responses:
 *        '200':
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/loginResponses'
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
 *                $ref: '#/responses/error'
 *        '500':
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/serverError'
 */
router.post('/login', AuthRequest.checkEmailPassword, AuthenticationMiddleware.local, function (request, response, next) {
    AuthController.login(request, response);
});

/**
 * @swagger
 * /auth/logout:
 *    post:
 *      tags:
 *      - Auth
 *      description: Logout de usuário
 *      responses:
 *        '204':
 *          description: Logout realizado.
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
 *                $ref: '#/responses/error'
 *        '500':
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/responses/serverError'
 *      security:
 *        - bearerAuth: []
 */
router.post('/logout', AuthenticationMiddleware.bearer, function (request, response, next) {
    AuthController.logout(request, response);
});

module.exports = router;

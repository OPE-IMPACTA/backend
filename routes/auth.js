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
 *              $ref: '#/parameters/requestLogin'
 *      responses:
 *        '200':
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 */
router.post('/login', AuthenticationMiddleware.local, AuthRequest.checkEmailPassword, function (request, response, next) {
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
 *          description: Accept
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Not Found
 *      security:
 *        - bearerAuth: []
 */
router.post('/logout', AuthenticationMiddleware.bearer, function (request, response, next) {
    AuthController.logout(request, response);
});

/**
 * @swagger
 * /auth/forgot_password:
 *    post:
 *      tags:
 *      - Auth
 *      description: Esqueci minha senha
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                email
 *              properties:
 *                email:
 *                  type: string
 *                  default: "master@master.com"
 *      responses:
 *        '200':
 *          description: Accept
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Not Found
 */
router.post('/forgot_password', AuthRequest.checkEmailExist, function (request, response, next) {
    AuthController.forgotPassword(request, response);
});

/**
 * @swagger
 * /auth/reset_password/{token}:
 *    post:
 *      tags:
 *      - Auth
 *      description: Alterar senha passando token gerado pelo forgot_password
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              required:
 *                password
 *                confirmPassword
 *              properties:
 *                password:
 *                  type: string
 *                  default: "12345678"
 *                confirmPassword:
 *                  type: string
 *                  default: "12345678"
 *      parameters:
 *        - in: path
 *          name: token
 *          type: string
 *          required: true
 *          default: "Token recedido por email"
 *      responses:
 *        '200':
 *          description: Accept
 *        '400':
 *          description: Bad Request
 *        '404':
 *          description: Not Found
 */
router.post('/reset_password/:token', AuthRequest.checkPasswordResetToken, AuthRequest.checkPassword, function (request, response, next) {
    AuthController.resetPassword(request, response);
});

router.get('/reset_password/:token', AuthRequest.checkPasswordResetToken, function (request, response, next) {
    AuthController.getPasswordReset(request, response);
});

module.exports = router;

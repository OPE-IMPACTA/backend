const express = require('express');
const router = express.Router();

const ClientsController = SystemLoad.controller('ClientsController');
const ClientsRequest = SystemLoad.request('ClientsRequest');

/**
 * @swagger
 * /clients:
 *    post:
 *      tags:
 *      - Clients
 *      description: Criar um funcionário
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/parameters/requestClients'
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
router.post('/', ClientsRequest.create, function (request, response, next) {
    ClientsController.create(request, response);
});

module.exports = router;

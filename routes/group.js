const express = require('express');
const router = express.Router();

const AuthenticationMiddleware = SystemLoad.middleware('AuthenticationMiddleware');
const GroupController = SystemLoad.controller('GroupController');

router.get('/', AuthenticationMiddleware.bearer, function (request, response, next) {
    GroupController.index(request, response);
});

module.exports = router;
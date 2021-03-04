const { Router } = require('express');
const router = new Router();
const HomeController = SystemLoad.controller('HomeController');

router.get('/producer-node', function (request, response, next) {
    HomeController.producerNode(request, response);
});

router.get('/producer-go', function (request, response, next) {
    HomeController.producerGoLang(request, response);
});

module.exports = router;

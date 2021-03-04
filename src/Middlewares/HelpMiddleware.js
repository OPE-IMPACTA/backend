class HelpMiddleware {

    toArray(req, res, next) {
        req.body = !Array.isArray(req.body) ? [ req.body ] : req.body
        return next()
    }
}

module.exports = new HelpMiddleware();

const acl = require('express-acl');

const AuthenticationService = SystemLoad.service('JWT/AuthenticationService');
const AclMiddleware = SystemLoad.middleware('AclMiddleware');

class AuthenticationMiddleware {

    local(req, res, next) {
        AuthenticationService.authenticate(
            'local',
            {session: false},
            (erro, user, info) => {
                if (erro && erro.name === 'InvalidArgumentError') {
                    return res.status(401).json({erro: erro.message});
                }

                if (erro) {
                    return res.status(500).json({erro: erro.message});
                }

                if (!user) {
                    return res.status(401).json();
                }

                req.user = user;
                return next();
            }
        )(req, res, next);
    }

    bearer(req, res, next) {
        AuthenticationService.authenticate(
            'bearer',
            {session: false},
            async (erro, user, info) => {
                if (erro && erro.name === 'JsonWebTokenError') {
                    return res.status(401).json({erro: erro.message});
                }

                if (erro && erro.name === 'TokenExpiredError') {
                    return res
                        .status(401)
                        .json({erro: erro.message, expiradoEm: erro.expiredAt});
                }

                if (erro) {
                    return res.status(500).json({erro: erro.message});
                }

                if (!user) {
                    return res.status(401).json();
                }

                req.token = info.token;
                req.user = user;
                req.group_id = info.group_id;

                await AclMiddleware.start(acl, req.group_id);

                return next();
            }
        )(req, res, next);
    }
}

module.exports = new AuthenticationMiddleware();

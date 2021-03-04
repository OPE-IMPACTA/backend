const { check, validationResult } = require('express-validator');
const UserRepository = SystemLoad.repository('UserRepository');

exports.checkEmailPassword = [
    check('email')
        .isEmail()
        .withMessage('Endereço de email inválido'),
    check('password')
        .notEmpty()
        .withMessage('Campo senha não pode ser vazio'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.checkEmailExist = [
    check('email')
        .custom(async (value, {req}) => {
            try {
                const result = await UserRepository.findByEmail(value)

                if (!result) {
                    return Promise.reject('Usuário não encontrado');
                }

                req.body.name = result.name

            } catch (err) {
                return Promise.reject('Houve um problema, tente mais tarde!');
            }
        }),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }

        return next();
    }
];

exports.checkPasswordResetToken = [
    check('token')
        .custom(async (value, {req}) => {
            try {
                const user = await UserRepository.getPasswordReset({ passwordResetToken: value, passwordResetExpires: { $gt: Date.now() }})
                req.password = user

                if (!user)
                    return Promise.reject('O token de redefinição de senha é inválido ou expirou.');

            } catch (err) {
                return Promise.reject('Houve um problema, tente mais tarde!');
            }
        }),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }

        return next();
    }
];

exports.checkPassword = [
    check('password')
        .not()
        .isEmpty()
        .isLength({min: 3})
        .withMessage('Deve ter pelo menos 3 caracteres'),
    check('confirmPassword', 'As senhas não coincidem')
        .custom((value, {req}) => (value === req.body.password)),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }

        return next();
    }
];

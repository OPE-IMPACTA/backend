const { check, oneOf, validationResult } = require('express-validator');

exports.create = [
    check('email')
        .isEmail()
        .notEmpty()
        .withMessage('Endereço de email inválido!'),
    check('password')
        .notEmpty()
        .withMessage('Campo senha não pode ser vazio!'),
    check('group_id')
        .notEmpty()
        .withMessage('Grupo de usuário é obrigarório!'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.update = [
    check('id')
        .notEmpty()
        .withMessage('Campo id não pode ser vazio'),
    oneOf([
        check('data.name').exists(), check('data.password').exists(), check('data.group_id').exists(),
    ], 'Pelo menos um dos seguintes campos são obrigatórios: Nome, Senha ou Grupo!'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.checkNameLength = [
    check('name')
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Deve ter pelo menos 3 caracteres'),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }

        return next();
    }
];

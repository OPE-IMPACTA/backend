const { check, validationResult } = require('express-validator');

exports.create = [
    check('projectId')
        .notEmpty()
        .withMessage('O projeto não pode estar vazio!'),
    check('userId')
        .notEmpty()
        .withMessage('O campo de funcionario responsável não pode ser vazio!'),
    check('startDate')
        .notEmpty()
        .withMessage('O campo de data de inicio não pode ser vazio!'),
    check('endDate')
        .notEmpty()
        .withMessage('O campo de data de fim não pode ser vazio!'),
    check('hours')
        .notEmpty()
        .withMessage('O campo de horas trabalhadas não pode ser vazio!'),
    check('description')
        .notEmpty()
        .withMessage('O campo de descrição não pode ser vazio!'),

    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.update = [
    check('projectId')
        .optional()
        .notEmpty()
        .withMessage('O projeto não pode estar vazio!'),
    check('userId')
        .optional()
        .notEmpty()
        .withMessage('O campo de funcionario responsável não pode ser vazio!'),
    check('startDate')
        .optional()
        .notEmpty()
        .withMessage('O campo de data de inicio não pode ser vazio!'),
    check('endDate')
        .optional()
        .notEmpty()
        .withMessage('O campo de data de fim não pode ser vazio!'),
    check('hours')
        .optional()
        .notEmpty()
        .withMessage('O campo de horas trabalhadas não pode ser vazio!'),
    check('description')
        .optional()
        .notEmpty()
        .withMessage('O campo de descrição não pode ser vazio!'),
        
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

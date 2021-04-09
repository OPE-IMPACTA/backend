const ProjectRepository = SystemLoad.repository('ProjectRepository');

const { check, validationResult } = require('express-validator');

exports.update = [
    check('user_id')
        .notEmpty()
        .optional()
        .withMessage('O user_id não pode estar vazio!'),
    check('client_id')
        .notEmpty()
        .optional()
        .withMessage('O campo department não pode ser vazio!'),
    check('description')
        .notEmpty()
        .optional()
        .withMessage('O description não pode ser vazio!'),
    check('status')
        .notEmpty()
        .optional()
        .withMessage('O status não pode ser vazio'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.create = [
    check('user_id')
    .notEmpty()
    .withMessage('O user_id não pode estar vazio!'),
check('client_id')
    .notEmpty()
    .withMessage('O campo department não pode ser vazio!'),
check('description')
    .notEmpty()
    .withMessage('O description não pode ser vazio!'),
check('status')
    .notEmpty()
    .withMessage('O status não pode ser vazio'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.checkIdProject = [
    check('id').custom(async (value) => {
        try {
            const result = await ProjectRepository.findById(value)
            if (!result) {
                return Promise.reject('ID não encontrado');
            }
        } catch (err) {
            return Promise.reject('ID está no formato inválido!');
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

exports.checkIdUser = [
    check('user_id').custom(async (value) => {
        try {
            const result = await ProjectRepository.findById(value)
            if (!result) {
                return Promise.reject('ID do user não encontrado');
            }
        } catch (err) {
            return Promise.reject('ID está no formato inválido!');
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

exports.checkIdClient = [
    check('client_id').custom(async (value) => {
        try {
            const result = await ProjectRepository.findById(value)
            if (!result) {
                return Promise.reject('ID do cliente não encontrado');
            }
        } catch (err) {
            return Promise.reject('ID está no formato inválido!');
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
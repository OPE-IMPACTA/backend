const ClientRepository = SystemLoad.repository('ClientRepository');

const { check, validationResult } = require('express-validator');

exports.update = [
    check('name')
        .notEmpty()
        .optional()
        .withMessage('O nome não pode estar vazio!'),
    check('company')
        .notEmpty()
        .optional()
        .withMessage('O campo company não pode ser vazio!'),
    check('department')
        .notEmpty()
        .optional()
        .withMessage('O campo department não pode ser vazio!'),
    check('name')
        .notEmpty()
        .optional()
        .withMessage('O campo name não pode ser vazio!'),
    check('email')
        .notEmpty()
        .optional()
        .isEmail()
        .withMessage('O campo email está inválido!'),
    check('phone')
        .notEmpty()
        .optional()
        .withMessage('O campo phone não pode ser vazio!'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.create = [
    check('name')
        .notEmpty()
        .withMessage('O nome não pode estar vazio!'),
    check('company')
        .notEmpty()
        .withMessage('O campo company não pode ser vazio!'),
    check('department')
        .notEmpty()
        .withMessage('O campo department não pode ser vazio!'),
    check('name')
        .notEmpty()
        .withMessage('O campo name não pode ser vazio!'),
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage('O campo email está inválido!'),
    check('phone')
        .notEmpty()
        .withMessage('O campo phone não pode ser vazio!'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.checkIdClient = [
    check('id').custom(async (value) => {
        try {
            const result = await ClientRepository.findById(value)
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
]
const { check, validationResult } = require('express-validator');
const UserRepository = SystemLoad.repository('UserRepository');
const GroupRepository = SystemLoad.repository('GroupRepository');

exports.create = [
    check('name')
    .notEmpty()
    .withMessage('Campo name não pode ser vazio!'),
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
    check('name')
        .optional()
        .notEmpty()
        .withMessage('Campo name não pode ser vazio!'),
        check('email')
        .optional()
        .notEmpty()
        .withMessage('Campo name não pode ser vazio!'),
    check('password')
        .optional()
        .notEmpty()
        .withMessage('Campo password não pode ser vazio!'),
    check('group_id')
        .optional()
        .notEmpty()
        .withMessage('Campo group_id não pode ser vazio!'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];

exports.checkEmailInUse = [
    check('email').custom(async (value, data) => {
        try {
            const result = await UserRepository.findByEmail(value)

            if (result && String(result._id) !== String(data.req.params.id)) {
                return Promise.reject('Email já está em uso não encontrado');
            }

        } catch (err) {
            return Promise.reject('ID está no formato inválido!');
        }
    }),
    check('group_id').custom(async (value) => {
        try {
            await GroupRepository.findById(value)
        } catch (err) {
            return Promise.reject('Group_id está no formato inválido!');
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

exports.checkIdUser = [
    check('id').custom(async (value) => {
        try {
            const result = await UserRepository.findById(value)
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

const ProjectRepository = SystemLoad.repository('ProjectRepository');
const UserRepository = SystemLoad.repository('UserRepository');
const TaskRepository = SystemLoad.repository('TaskRepository');

const { check, validationResult } = require('express-validator');

exports.create = [
    check('project_id')
        .notEmpty()
        .withMessage('O projeto não pode estar vazio!'),
    check('user_id')
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
    check('project_id')
        .optional()
        .notEmpty()
        .withMessage('O projeto não pode estar vazio!'),
    check('user_id')
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

exports.checkIdTask = [
    check('id').custom(async (value) => {
        try {
            const result = await TaskRepository.findById(value)
            if (!result) {
                return Promise.reject('ID da tarefa não encontrado');
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
            console.log('teste', value)
            const result = await UserRepository.findById(value)
            console.log(result)
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

exports.checkIdProject = [
    check('project_id').custom(async (value) => {
        try {
            const result = await ProjectRepository.findById(value)
            if (!result) {
                return Promise.reject('ID do projeto não foi encontrado');
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

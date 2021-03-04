const { check, validationResult } = require('express-validator');
const TestRepository = SystemLoad.repository('TestRepository');


const invalidMessage = (field) => {
    return `Campo ${field} está no formato incorreto`
}

exports.ValidField = () => {
    return [
        check('title')
            .notEmpty()
            .withMessage(invalidMessage('title')),
        check('description')
            .notEmpty()
            .withMessage(invalidMessage('description')),
        check('url')
            .notEmpty()
            .withMessage(invalidMessage('url')),
        check('project')
            .notEmpty()
            .withMessage(invalidMessage('project')),
        check('operations', invalidMessage('operations'))
            .notEmpty()
            .withMessage(invalidMessage('operations'))
        ,
        (request, response, next) => {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() });
            }

            return next();
        }
    ]
}

exports.ValidFieldUpdate = () => {
    return [
        check('title')
            .optional()
            .isLength({ min: 3 })
            .withMessage(invalidMessage('title')),
        check('description')
            .optional()
            .isLength({ min: 3 })
            .withMessage(invalidMessage('description')),
        check('url')
            .optional()
            .isLength({ min: 3 })
            .withMessage(invalidMessage('url')),
        check('project')
            .optional()
            .isLength({ min: 3 })
            .withMessage(invalidMessage('project')),
        check('id_user')
            .optional()
            .isLength({ min: 3 })
            .withMessage(invalidMessage('id_user')),
        check('operations', invalidMessage('operations'))
            .optional()
            .isLength({ min: 3 })
            .withMessage(invalidMessage('operations'))
        ,
        (request, response, next) => {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() });
            }

            return next();
        }
    ]
}

exports.idTestExist = () => {
    return [
        check('id').custom(async (value) => {
            try {
                const result = await TestRepository.findById(value)
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
                return response.status(400).json({ errors: errors.array() });
            }

            return next();
        }
    ]
}

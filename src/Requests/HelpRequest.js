const { body, validationResult } = require('express-validator');
const HelpRepository = SystemLoad.repository('HelpRepository');

exports.ArrayValidFields = () => {
    return [
        body('*.field')
            .notEmpty()
            .withMessage('Campo field está no formato incorreto'),
        body('*.action')
            .notEmpty()
            .withMessage('Campo Action está no formato incorreto'),
        (request, response, next) => {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() });
            }

            return next();
        }
    ]
}

exports.ValidField = () => {
    return [
        body('action', 'Campo Action está no formato incorreto')
            .notEmpty(),
        (request, response, next) => {
            const errors = validationResult(request);

            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() });
            }

            return next();
        }
    ]
}

exports.ValidFieldInUse = () => {
    return [
        body('*.field').custom(value => {
            return HelpRepository.countByFilter('field', value).then(item => {
                if (item === 1) {
                    return Promise.reject('Field já está em uso');
                }
            })
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

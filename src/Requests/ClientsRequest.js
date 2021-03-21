const { check, validationResult } = require('express-validator');

exports.create = [
    check('name')
        .notEmpty()
        .withMessage('O nome não pode estar vazio!'),
    check('office')
        .notEmpty()
        .withMessage('O campo office não pode ser vazio!'),
    (request, response, next) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        return next();
    }
];


const { check, validationResult } = require('express-validator/check');

const validator = {
    validatorCreate: [
        check('team_id').not().isEmpty().withMessage('The field team_id is required'),
        check('score').not().isEmpty().withMessage('The field score is required'),
        check('obstacle_id').not().isEmpty().withMessage('The field obstacle_id is required'),
    ],

    validatorUpdate: [
        check('_id').not().isEmpty().withMessage('The field _id is required'),
    ],

    validatorDelete: [
        check('_id').not().isEmpty().withMessage('The field _id is required'),
    ],

    validate: function instanceErrors (req, res, validate) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return validate({ errors: errors.array() });
        }

        return validate({})
    }
}

module.exports = validator
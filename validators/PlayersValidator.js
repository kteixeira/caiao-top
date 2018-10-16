const { check, validationResult } = require('express-validator/check');

const validator = {
    validatorCreate: [
        check('name').not().isEmpty().withMessage('The field name is required'),
        check('locale').not().isEmpty().withMessage('The field locale is required'),
        check('height').not().isEmpty().withMessage('The field height is required'),
        check('weight').not().isEmpty().withMessage('The field weight is required'),
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
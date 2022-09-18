const { body } = require('express-validator');

const loginFieldValidation = [body('email', 'email is required').not().isEmpty(), body('password', 'password is required').not().isEmpty()];

module.exports = { loginFieldValidation };

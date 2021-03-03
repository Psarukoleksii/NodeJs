const Joi = require('joi');

const {NAME_REGEXP, PASSWORD_REGEXP, EMAIL_REGEXP} = require('../../config/regexp/regexp.enum');

const carsSubScheme = Joi.array().items(
    Joi.object({
        model: Joi.string().required(),
        price: Joi.number().required()
    })
);

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .required()
        .min(2)
        .max(50)
        .regex(NAME_REGEXP),
    age: Joi.number().max(120),
    email: Joi.string().regex(EMAIL_REGEXP).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required(),
    cars: carsSubScheme
});

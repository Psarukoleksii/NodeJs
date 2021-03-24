const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string(),
    age: Joi.number(),
    email: Joi.string(),
})

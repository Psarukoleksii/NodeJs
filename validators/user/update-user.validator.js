const Joi = require('joi');

const {NAME_REGEXP, EMAIL_REGEXP} = require('../../config/regexp/regexp.enum');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(2).max(50).regex(NAME_REGEXP),
    age: Joi.number().min(5).max(120),
    email: Joi.string().regex(EMAIL_REGEXP)
})

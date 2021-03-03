const errorMessages = require('../config/messages/error.messages');
const errorCodes = require('../config/codes/error.codes');
const { userValidators } = require('../validators')


module.exports = {
    isObjectUser: async (req, res, next) => {
        try {
            const {error} = await userValidators.createUserValidator.validate(req.body);7

            if(error) throw new Error(error.details[0].message);

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
};

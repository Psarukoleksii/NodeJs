const errorCodes = require('../config/codes/error.codes');
const {userValidators} = require('../validators');
const {errorHand, messages} = require('../config');

module.exports = {
    isObjectUser: async (req, res, next) => {
        try {
            const {error} = await userValidators.createUserValidator.validate(req.body);

            if (error) throw new Error(error.details[0].message);

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidId: async (req, res, next) => {
        try {
            const {userId} = req.params;

            if (!userId || userId.length < 20) {
                throw new errorHand.errorHandler(errorCodes.BAD_REQUEST, messages.errorMessages.ID_IS_NOT_VALID)
            }

            next();
        } catch (e) {
            next(e)
        }
    }
};

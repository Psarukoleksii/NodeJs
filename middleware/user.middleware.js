const {userValidators} = require('../validators');
const {errorHand, messages, codes} = require('../config');
const {userService} = require('../services')

module.exports = {
    isObjectUser: async (req, res, next) => {
        try {
            const user = req.body;

            const {error} = await userValidators.createUserValidator.validate(req.body);

            if (error) throw new Error(error.details[0].message);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isValidId: (req, res, next) => {
        try {
            const {userId} = req.params;

            if (!userId || userId.length < 20) {
                throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.ID_IS_NOT_VALID);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    mailIsFree: async (req, res, next) => {
        try {
            const { email } = req.body;

            const findEmail = await userService.findEmail(email);

            if (findEmail.length > 0) {
                throw new errorHand.errorHandler(codes.errorCodes.CONFLICT, messages.errorMessages.EMAIL_IS_USED);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    updateAccount: async (req, res, next) => {
        try {
            const user = req.body;

            const { error } = await userValidators.updateUserValidator.validate(user);

            if(error) {
                throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.USER_NOT_VALID)
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};

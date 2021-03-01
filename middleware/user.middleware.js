const errorMessages = require('../config/messages/error.messages');
// const DB = require('../dataBase/user.data');
const errorCodes = require('../config/codes/error.codes');

module.exports = {
    isValidIdUser: (req, res, next) => {
        try {
            const userId = +req.params.userId;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessages.ID_IS_NOT_VALID);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isObjectUser: (req, res, next) => {
        try {
            const {name, password} = req.body;

            if (!name || !password) {
                throw new Error(errorMessages.HAVE_NOT_PASSWORD_OR_NAME);
            }

            if (password.length < 6) {
                throw new Error(errorMessages.TO_WEAK_PASSWORD);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUsers: (req, res, next) => {
        try {
            if (DB.length === 0) {
                throw new Error(errorMessages.USERS_IS_NOT_FIND);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
}

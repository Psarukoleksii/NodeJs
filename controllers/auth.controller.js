const {passwordHasher, tokenizer} = require('../helpers');
const O_Auth = require('../dataBase/models/O_Auth');
const { messages, errorHand, codes } = require('../config');
const { authService } = require('../services');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await authService.authUser(email);

            if (!user) {
                throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.USER_IS_NOT_FIND)
            }

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            await O_Auth.create({...tokens, _user_id: user._id});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { _user_id, _id } = req.tokenInfo;

            const tokens = tokenizer();

            await O_Auth.findByIdAndUpdate(_id, {...tokens, _user_id})

            res.json(tokens);
            next();
        } catch (e) {
            next(e);
        }
    }
};

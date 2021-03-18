const jwt = require('jsonwebtoken');
const {constants, messages, errorHand, codes} = require('../config');
const {authService} = require('../services');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.TOKEN_IS_REQUIRED);
            }

            jwt.verify(access_token, constants.JWT_ACCESS_SECRET, err => {
                if (err) {
                    throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.TOKEN_IS_NOT_VALID);
                }
            }); // token valid?

            const tokens = await authService.findAccessToken(access_token);

            if (!tokens) {
                throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.TOKEN_IS_NOT_VALID);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshTokenMiddleware: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.TOKEN_IS_REQUIRED);
            }

            jwt.verify(refresh_token, constants.JWT_REFRESH_SECRET, err => {
                if (err) {
                    throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.TOKEN_IS_NOT_VALID);
                }
            }); // token valid?

            const tokens = await authService.findRefreshToken(refresh_token);

            if (!tokens) {
                throw new errorHand.errorHandler(codes.errorCodes.BAD_REQUEST, messages.errorMessages.TOKEN_IS_NOT_VALID);
            }

            req.tokenInfo = tokens;

            next();
        } catch (e) {
            next(e);
        }
    },


}

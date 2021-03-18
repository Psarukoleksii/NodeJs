const jwt = require('jsonwebtoken');
const O_Auth = require('../dataBase/models/O_Auth');
const { constants, messages } = require('../config');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try{
            const access_token = req.get(constants.AUTHORIZATION);

            if(!access_token){
                throw new Error(messages.errorMessages.TOKEN_IS_REQUIRED);
            }

            jwt.verify(access_token, constants.JWT_ACCESS_SECRET, err=> {
                if(err) {
                    throw new Error(messages.errorMessages.TOKEN_IS_NOT_VALID);
                }
            }); // перевіряє чи токен валідний за рахунок його строку життя

            const tokens = await O_Auth.findOne({access_token}).populate('_user_id');

            if(!tokens){
                throw new Error(messages.errorMessages.TOKEN_IS_NOT_VALID);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
}

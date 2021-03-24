const { errorHand, messages, codes } = require('../config')

module.exports = {
    checkRole: (whoHaveAccess = []) => (req, res, next) => {
        try{
            const { role } = req.body;

            if(!whoHaveAccess.length){
                return next();
            }

            if(!whoHaveAccess.includes(role)){
                throw new errorHand.errorHandler(codes.errorCodes.FORBIDDEN, messages.errorMessages.FORBIDDEN);
            }

            next()
        } catch (e) {
            next(e);
        }
    }
}

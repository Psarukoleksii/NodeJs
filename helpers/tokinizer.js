const jwt = require('jsonwebtoken');
const {constants} = require('../config')

module.exports = () => {
    const access_token = jwt.sign({}, constants.JWT_ACCESS_SECRET, { expiresIn: '20m' });
    const refresh_token = jwt.sign({}, constants.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
        access_token,
        refresh_token
    };
};


const User = require('../dataBase/models/user');
const O_Auth = require('../dataBase/models/O_Auth');

module.exports = {
    authUser: (email) => User.findOne({email}),

    findAccessToken: (access_token) => O_Auth.findOne({access_token}).populate('_user_id'),

    findRefreshToken: (refresh_token) => O_Auth.findOne({refresh_token})
};

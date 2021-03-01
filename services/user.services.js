const User = require('../dataBase/models/user');

module.exports = {
    allUsers: () => User.find(),

    userById: (userId) => User.findById(userId),

    createUser: (objUser) => User.create(objUser),

    deleteUser: (userId) => User.deleteOne({_id: userId})
}


const User = require('../dataBase/models/user');

module.exports = {
    allUsers: () => User.find(),

    userById: (userId) => User.findById(userId),

    createUser: (objUser) => User.create(objUser),

    updateUserById: (userId, updateObject) => User.updateOne({_id: userId}, {$set: updateObject}),

    deleteUser: (userId) => User.deleteOne({_id: userId})
}


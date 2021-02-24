const DB = require('../dataBase/user.data')

module.exports = {
    allUsers: ()=>{
        return DB
    },

    userById: (userId) =>{
        return DB[userId]
    },

    createUser: (objUser) => {
        DB.push(objUser)
    },

    deleteUser: (userId) =>{
        DB.splice(userId, 1);
    }
}

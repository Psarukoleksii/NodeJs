const userService = require('../services/user.services');
const errorCodes = require('../config/codes/error.codes');
const goodMessages = require('../config/messages/good.messages');
const goodCodes = require('../config/codes/good.codes')


module.exports = {
    getAllUser: (req, res) => {
        try {
            const users = userService.allUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }

    },

    getUserById: (req, res) => {
        try {
            const {userID} = req.params;

            const user = userService.userById(userID);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createUser: (req, res) => {
        try {
            userService.createUser(req.body);

            res.status(goodCodes.CREATED).json(goodMessages.USER_CREATE);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: (req, res) => {
        try {
            const {userId} = req.params;

            userService.deleteUser(userId);

            res.status(goodCodes.OK).json(goodMessages.USER_DELETE);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
}

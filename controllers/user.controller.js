const userService = require('../services/user.services');
const errorCodes = require('../config/codes/error.codes');
const goodMessages = require('../config/messages/good.messages');
const goodCodes = require('../config/codes/good.codes');
const passwordHasher = require('../helpers');


module.exports = {
    getAllUser: async (req, res) => {
        try {
            const users = await userService.allUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {userId} = req.params;

            const user = await userService.userById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordHasher.passwordHasher.hash(password);

            await userService.createUser({...req.body, password: hashPassword});

            res.status(goodCodes.CREATED).json(goodMessages.USER_CREATE);
        } catch (e) {
            return res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {userId} = req.params;

            await userService.deleteUser(userId);

            res.status(goodCodes.OK).json(goodMessages.USER_DELETE);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};

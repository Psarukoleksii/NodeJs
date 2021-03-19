const path = require('path');
const fs = require('fs-extra').promises;
const uuid = require('uuid').v1;

const {mailerservice, userService} = require('../services');
const goodMessages = require('../config/messages/good.messages');
const goodCodes = require('../config/codes/good.codes');
const passwordHasher = require('../helpers');
const {emailActionsEnum} = require('../config');

module.exports = {
    getAllUser: async (req, res, next) => {
        try {
            const users = await userService.allUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.userById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {body: {password, email}, avatar} = req;

            const hashPassword = await passwordHasher.passwordHasher.hash(password);

            const user = await userService.createUser({...req.body, password: hashPassword});

            await mailerservice.sendMail(email, emailActionsEnum.WELCOME, {userName: email});

            if(avatar){
                const pathWithoutStatic = path.join('user', `${user._id}`, 'photos');
                const photoDir = path.join(process.cwd(), 'static', pathWithoutStatic);
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid()}.${fileExtension}`;
                const photoPath = path.join(photoDir, photoName);

                await fs.mkdir(photoDir, {recursive: true});
                await avatar.mv(photoPath);

                await userService.updateUserById(user._id, {avatar: path.join(pathWithoutStatic, photoName)});
            }

            res.status(goodCodes.CREATED).json(goodMessages.USER_CREATE);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteUser(userId);

            res.status(goodCodes.OK).json(goodMessages.USER_DELETE);
        } catch (e) {
            next(e);
        }
    }
};

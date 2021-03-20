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
            const {body: {password, email}, avatar, docs} = req;

            const hashPassword = await passwordHasher.passwordHasher.hash(password);

            const user = await userService.createUser({...req.body, password: hashPassword});

            await mailerservice.sendMail(email, emailActionsEnum.WELCOME, {userName: email});

            if (avatar) {
                const {finalFilePath, uploadPath, fileDir} = fileDirBuilder(avatar, 'photos', user._id)

                await fs.mkdir(fileDir, {recursive: true});
                await avatar.mv(finalFilePath);

                await userService.updateUserById(user._id, {avatar: uploadPath});
            }

            if (docs) {
                const {uploadPath, finalFilePath, fileDir} = fileDirBuilder(...docs, 'documents', user._id);

                await fs.mkdir(fileDir, {recursive: true});
                await docs.forEach(value=> value.mv(finalFilePath))

                await userService.updateUserById(user._id, {documents: uploadPath});
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


function fileDirBuilder(fileName, itemType, itemId) {
    const pathWithoutStatic = path.join('user', `${itemId}`, `${itemType}`);
    const fileDir = path.join(process.cwd(), 'static', pathWithoutStatic);
    const fileExtension = fileName.name.split('.').pop();
    const finalFileName = `${uuid()}.${fileExtension}`;
    const finalFilePath = path.join(fileDir, finalFileName);

    const uploadPath = path.join(pathWithoutStatic, finalFileName);

    return {finalFilePath, uploadPath, fileDir};
}

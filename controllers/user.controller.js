const path = require('path');
const fs = require('fs-extra').promises;


const { mailerservice, userService } = require('../services');
const { messages, codes, emailActionsEnum } = require('../config');
const { fileDirBuilder } = require('../helpers');
const passwordHasher = require('../helpers');

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
                const {finalFilePath, uploadPath, fileDir} = fileDirBuilder.fileDirBuilder(avatar, 'photos', user._id)

                await fs.mkdir(fileDir, {recursive: true});
                await avatar.mv(finalFilePath);

                await userService.updateUserById(user._id, {avatar: uploadPath});
            }

            if (docs) {
                const updateDocs = [];

                await (async function () {
                    for await (let doc of docs) {
                        const {uploadPath, finalFilePath, fileDir} = fileDirBuilder.fileDirBuilder(doc, 'documents', user._id);

                        await fs.mkdir(fileDir, {recursive: true});
                        await doc.mv(finalFilePath);
                        updateDocs.push({path: uploadPath})
                    }
                    await userService.updateUserWithDocs(user._id, updateDocs);
                })();
            }

            res.status(codes.goodCodes.CREATED).json(messages.goodMessages.USER_CREATE);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteUser(userId);

            res.status(codes.goodCodes.OK).json(messages.goodMessages.USER_DELETE);
        } catch (e) {
            next(e);
        }
    }
};




const {Router} = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const { authMiddleware, fileMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUser);

router.post(
    '/',
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkAvatar,
    userMiddleware.isObjectUser,
    userController.createUser
);

router.use('/:userId', userMiddleware.isValidId);

router.get(`/:userId`, userController.getUserById);

router.delete('/:userId',authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

module.exports = router;

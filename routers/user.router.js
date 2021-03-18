const {Router} = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/user.middleware');
const { authMiddleware } = require('../middleware');

router.get('/', userController.getAllUser);

router.post('/', userMiddleware.isObjectUser, userController.createUser);

router.use('/:userId', userMiddleware.isValidId);

router.get(`/:userId`, userController.getUserById);

router.delete('/:userId',authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

module.exports = router;

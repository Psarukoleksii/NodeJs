const {Router} = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/user.middleware')

router.get('/', userController.getAllUser);

router.get(`/:userId`, userController.getUserById);

router.post('/', userMiddleware.isObjectUser, userController.createUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;

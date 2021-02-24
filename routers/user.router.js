const {Router} = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/user.middleware')

router.get('/', userMiddleware.isUsers, userController.getAllUser);

router.get(`/:userId`, userMiddleware.isValidIdUser, userController.getUserById);

router.post('/', userMiddleware.isObjectUser, userController.createUser);

router.delete('/:userId', userMiddleware.isValidIdUser, userController.deleteUser);


module.exports = router;

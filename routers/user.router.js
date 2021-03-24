const {Router} = require('express');
const router = Router();

const userController = require('../controllers/user.controller');
const { authMiddleware, fileMiddleware, userMiddleware, isAdminMiddleware } = require('../middleware');

router.get('/', userController.getAllUser);

router.post( '/',
  // fileMiddleware.checkFileMiddleware,
  //   fileMiddleware.checkAvatar,
    userMiddleware.isObjectUser,
    isAdminMiddleware.checkRole(['admin']),
    userMiddleware.mailIsFree,
    userController.createUser
);

router.use('/:userId', userMiddleware.isValidId);

router.get(`/:userId`, userController.getUserById);

router.put(
  '/:userId',
  authMiddleware.checkAccessTokenMiddleware,
  userMiddleware.updateAccount,
  userController.updateUser
);

router.delete('/:userId',authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);

module.exports = router;

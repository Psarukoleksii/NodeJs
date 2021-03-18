const {Router} = require('express');
const router = Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middleware');

router.post('/', authController.authUser);

router.post('/refresh', authMiddleware.checkRefreshTokenMiddleware, authController.refreshToken);

module.exports = router;

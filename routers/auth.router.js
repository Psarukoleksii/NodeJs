const { Router } = require('express');
const router = Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middleware');

router.post('/', authController.authUser);

module.exports = router;

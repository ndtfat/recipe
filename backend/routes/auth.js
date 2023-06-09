const router = require('express').Router();
const authController = require('../controllers/authController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', verifyAccessToken, authController.logout);

router.post('/refresh-access-token', authController.refreshAccessToken);

module.exports = router;

const router = require('express').Router();
const authController = require('../controllers/authController');
const verifyLogin = require('../middlewares/verifyLogin');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/logout', verifyLogin, authController.logout);

router.post('/refresh-access-token', authController.refreshAccessToken);

module.exports = router;

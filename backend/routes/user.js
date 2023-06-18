const router = require('express').Router();
const userController = require('../controllers/userController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

router.put('/update/info', verifyAccessToken, userController.updateInfo);

router.put('/update/password', verifyAccessToken, userController.updatePassword);

router.patch('/save-recipe', verifyAccessToken, userController.saveRecipe);

router.patch('/unsave-recipe', verifyAccessToken, userController.unsaveRecipe);

router.get('/:id', verifyAccessToken, userController.getUserInfo);

module.exports = router;

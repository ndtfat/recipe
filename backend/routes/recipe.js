const router = require('express').Router();
const recipeController = require('../controllers/recipeController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

router.post('/add', verifyAccessToken, recipeController.add);

module.exports = router;

const router = require('express').Router();
const recipeController = require('../controllers/recipeController');
const verifyLogin = require('../middlewares/verifyLogin');

router.post('/add', verifyLogin, recipeController.add);

module.exports = router;

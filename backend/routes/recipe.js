const router = require('express').Router();
const recipeController = require('../controllers/recipeController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

router.post('/add', verifyAccessToken, recipeController.add);

router.get('/saved', verifyAccessToken, recipeController.getSavedRecipes);

router.get('/detail/:id', verifyAccessToken, recipeController.getDetailRecipe);

router.get('/relative/:id', verifyAccessToken, recipeController.getRelativeRecipes);

router.get('/:id', verifyAccessToken, recipeController.getUserRecipes);

module.exports = router;

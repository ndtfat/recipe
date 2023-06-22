const router = require('express').Router();
const recipeController = require('../controllers/recipeController');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

router.post('/add', verifyAccessToken, recipeController.add);

router.get('/saved', verifyAccessToken, recipeController.getSavedRecipes);

router.patch('/delete-soft', verifyAccessToken, recipeController.softDelete);

router.patch('/restore', verifyAccessToken, recipeController.restore);

router.delete('/delete-force', verifyAccessToken, recipeController.forceDelete);

router.get('/top1-each-type', recipeController.getTopRecipes);

router.get('/search', recipeController.search);

router.get('/detail/:id', verifyAccessToken, recipeController.getDetailRecipe);

router.get('/relative/:id', verifyAccessToken, recipeController.getRelativeRecipes);

router.get('/:id/deleted', verifyAccessToken, recipeController.getUserRecipesDeleted);

// id --> recipes of id(user)
router.get('/mine/:id', verifyAccessToken, recipeController.getUserRecipes);

router.get('/:type', recipeController.getRecipesOfType);

module.exports = router;

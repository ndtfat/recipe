const router = require('express').Router();
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const reviewController = require('../controllers/reviewController');

router.post('/add', verifyAccessToken, reviewController.add);

router.delete('/delete/:id', verifyAccessToken, reviewController.delete);

router.get('/get/:id', verifyAccessToken, reviewController.get);

module.exports = router;

const RecipeModel = require('../models/Recipe');
const ReviewModel = require('../models/Review');

class reviewController {
    // [POST] /review/add
    async add(req, res) {
        const recipe = await RecipeModel.findById(req.body.for_recipe);
        const prevTotal = recipe.total_rated;
        const prevSumRated = recipe.rate * prevTotal;

        recipe.total_rated += 1;

        recipe.rate = (prevSumRated + Number(req.body.rate)) / recipe.total_rated;
        const isRated = await recipe.save();

        if (isRated) {
            const review = new ReviewModel(req.body);
            const addedReview = await review.save();
            await addedReview.populate('author');

            ReviewModel.find({})
                .populate('author')
                .then((data) =>
                    res.status(200).json({
                        status: 200,
                        message: 'add review success',
                        // data: reviews axcept review just added
                        data: data.filter((item) => item._id !== addedReview._id),
                        addedReview,
                    }),
                )
                .catch((err) => res.json(err));
        } else {
            return res.json('recipe have not saved yet');
        }
    }

    // [DELETE] /review/delete/:id
    async delete(req, res) {
        const review = await ReviewModel.findById(req.params.id);
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const prevTotal = recipe.total_rated;
        const prevSumRated = recipe.rate * prevTotal;

        recipe.total_rated -= 1;
        recipe.rate = (prevSumRated - review.rate) / recipe.total_rated;
        const isRated = await recipe.save();

        if (isRated) {
            await review.deleteOne();

            ReviewModel.find({})
                // return data: reamin reviews
                .then((data) => res.status(200).json({ status: 200, message: 'Delete review success', data }))
                .catch((err) => res.json(err));
        }
    }

    // [GET] /review/:id?sortBy
    async get(req, res) {
        try {
            const userId = req.user._id;
            const recipeId = req.params.id;
            const reviews = await ReviewModel.find({ for_recipe: recipeId })
                .populate('author')
                .sort({ updatedAt: req.query.sortBy || 'desc' });
            const isReviewed = reviews.filter((item) => item.author.id === userId);

            if (reviews) {
                res.status(200).json({
                    status: 200,
                    message: 'get reviews success',
                    /* 
                        isReviewed: 
                            return false if user have NOT review this recipe yet
                            return review of user for this recipe if user reviewed
                    */
                    isReviewed: isReviewed.length > 0 ? isReviewed : false,
                    // data: all reviews of this recipe except user's review if user reviewed
                    data: reviews.length > 0 ? reviews.filter((item) => item.author.id !== userId) : reviews,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new reviewController();

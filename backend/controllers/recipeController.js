const UserModel = require('../models/User');
const RecipeModel = require('../models/Recipe');

class RecipeController {
    // [POST] /recipe/add
    add(req, res) {
        const newRecipe = new RecipeModel({ ...req.body });
        newRecipe
            .save()
            .then((data) => res.status(200).json({ status: 200, message: 'Add recipe successful', recipe: data }))
            .catch((err) => {
                if (err.name === 'ValidationError')
                    return res.status(403).json({ status: 403, message: 'ValidationError', err: err });
                else return res.status(500).json({ status: 500, message: 'server err', err: err });
            });
    }

    //[GET] /recipe/search?text=
    async search(req, res) {
        let page = Number(req.query.page);
        const text = req.query.text;
        const size = 16;
        const sortByQuery = req.query.sortBy;
        const [fieldSort, sortBy] = sortByQuery ? sortByQuery.split(' ') : ['createdAt', 'desc'];

        if (!page || page < 1) page = 1;
        const skip = size * (page - 1);

        const recipes = await RecipeModel.find({ title: { $regex: text, $options: 'i' } })
            .skip(skip)
            .limit(size)
            .populate({ path: 'author', select: 'first_name last_name' })
            .sort({ [fieldSort]: sortBy });

        if (recipes) {
            res.status(200).json({
                status: 200,
                message: `Get search_results success`,
                page,
                total_recipes: recipes.length,
                total_pages: Math.ceil(recipes.length / size),
                recipes,
            });
        }
    }

    // [GET] /recipe/mine/:id?page=
    async getUserRecipes(req, res) {
        const [fieldSort, sortBy] = req.query.sortBy ? req.query.sortBy.split(' ') : ['updatedAt', 'desc'];
        const id = req.params.id;
        const user = req.user;
        const size = 12;
        let page = Number(req.query.page);

        try {
            if (!page || page < 1) page = 1;
            const skip = size * (page - 1);

            let findCondition = { author: id, isPublic: true };

            // user's own recipes
            if (id === user._id || user.isAdmin) {
                findCondition = { author: id };
            }

            const total_recipes = await RecipeModel.countDocuments(findCondition);
            const recipes = await RecipeModel.find(findCondition)
                .skip(skip)
                .limit(size)
                .sort({ [fieldSort]: sortBy });

            res.status(200).json({
                status: 200,
                message: 'Get recipes success',
                total_pages: Math.ceil(total_recipes / size),
                total_recipes,
                page,
                recipes,
            });
        } catch (err) {
            console.log(err);
        }
    }

    //[GET] /recipe/saved?page=
    async getSavedRecipes(req, res) {
        const [fieldSort, sortBy] = req.query.sortBy ? req.query.sortBy.split(' ') : ['updatedAt', 'desc'];

        try {
            const { saved_recipes } = await UserModel.findById(req.user._id, { saved_recipes: { $slice: 1 } })
                .sort({ [fieldSort]: sortBy })
                .populate({ path: 'saved_recipes', populate: { path: 'author', select: 'first_name last_name' } })
                .select('saved_recipes -_id');

            let page = Number(req.query.page);
            if (!page || page < 1) page = 1;
            const size = 12;
            const skip = size * (page - 1);

            const returnData = saved_recipes.slice(skip, size + 1);
            res.status(200).json({
                status: 200,
                message: 'Get saved_recipes success',
                total_pages: Math.ceil(saved_recipes.length / size),
                total_recipes: saved_recipes.length,
                page,
                recipes: returnData,
            });
        } catch (err) {
            res.status(500).json({ status: 500, message: 'Server error', err });
        }
    }

    //[GET] /recipe/detail/:id
    async getDetailRecipe(req, res) {
        const recipeId = req.params.id;
        const userId = req.user._id;

        const user = await UserModel.findById(userId);
        const recipe = await RecipeModel.findWithDeleted({ _id: recipeId }).populate({
            path: 'author',
            select: 'first_name last_name',
        });

        if (recipe) {
            const isSaved = user.saved_recipes.includes(recipeId);
            const isUsersRecipe = userId === recipe[0].author._id;

            return res.json({
                status: 200,
                message: 'Get recipe_detail success',
                isSaved,
                isUsersRecipe,
                data: recipe[0],
            });
        } else {
            return res.status(403).json({ status: 403, message: 'Invalid recipe_id', err });
        }
    }

    // [GET] /recipe/relative/:id
    async getRelativeRecipes(req, res) {
        const recipeId = req.params.id;
        try {
            const recipe = await RecipeModel.find({ _id: recipeId });

            const relativeRecipes = await RecipeModel.find({
                _id: { $ne: recipeId },
                isPublic: true,
                dishType: recipe[0].dishType,
            }).populate({
                path: 'author',
                select: 'first_name last_name',
            });

            res.status(200).json({ status: 200, message: 'Get relative_recipes success', data: relativeRecipes });
        } catch (err) {
            console.log(err);
        }
    }

    //[PATCH] /recipe/delete-soft
    softDelete(req, res) {
        const ids = req.body.ids;
        RecipeModel.delete({ _id: { $in: ids } }).then((data) =>
            res.json({ message: 'Recipes are moved into trash', data }),
        );
    }

    //[GET] /recipe/:id/deleted?sortBy=&page=
    async getUserRecipesDeleted(req, res) {
        const [fieldSort, sortBy] = req.query.sortBy ? req.query.sortBy.split(' ') : ['updatedAt', 'desc'];
        const id = req.params.id;
        const size = 12;
        let page = Number(req.query.page);

        try {
            if (!page || page < 1) page = 1;
            const skip = size * (page - 1);

            const total_recipes = await RecipeModel.countDocumentsDeleted({ author: id });
            const recipes = await RecipeModel.findDeleted()
                .skip(skip)
                .limit(size)
                .sort({ [fieldSort]: sortBy });

            res.status(200).json({
                status: 200,
                message: 'Get recipes success',
                total_pages: Math.ceil(total_recipes / size),
                total_recipes,
                page,
                recipes,
            });
        } catch (err) {
            console.log(err);
        }
    }

    //[PATCH] /recipe/restore
    restore(req, res) {
        const ids = req.body.ids;
        RecipeModel.updateManyDeleted({ _id: { $in: ids } }, { deleted: false }).then((data) =>
            res.json({ message: 'Restore success', data }),
        );
    }

    //[DELETE] /recipe/delete-force
    forceDelete(req, res) {
        const ids = req.body.ids;
        RecipeModel.deleteMany({ _id: { $in: ids } }).then((data) => res.json({ message: 'Delete success', data }));
    }

    //[GET] /recipe/top1-each-type
    getTopRecipes(req, res) {
        RecipeModel.aggregate([
            {
                $match: {
                    deleted: false,
                    isPublic: true,
                    dishType: { $in: ['main dish', 'dessert', 'drink', 'healthy', 'soup'] },
                },
            },
            { $lookup: { from: 'users', localField: 'author', foreignField: '_id', as: 'user' } },
            { $sort: { rate: -1 } },
            { $group: { _id: '$dishType', recipes: { $push: '$$ROOT' } } },
            {
                $project: {
                    top_one: {
                        $slice: ['$recipes', 1],
                    },
                },
            },
        ])
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
    }

    //[GET] /recipe/:type?sortBy
    async getRecipesOfType(req, res) {
        let page = Number(req.query.page);
        const size = 16;
        const dishType = req.params.type;

        const sortByQuery = req.query.sortBy;
        const [fieldSort, sortBy] = sortByQuery ? sortByQuery.split(' ') : ['createdAt', 'desc'];

        if (!page || page < 1) page = 1;
        const skip = size * (page - 1);

        let condition = { dishType, isPublic: true };
        const types = ['soup', 'drink', 'main dish', 'healthy', 'dessert'];
        if (dishType === 'other') condition = { dishType: { $not: { $in: types } } };

        const latestRecipes = await RecipeModel.find(condition).sort({ createdAt: 'desc' }).limit(1);
        const recipes = await RecipeModel.find(condition)
            .skip(skip)
            .limit(size)
            .populate({ path: 'author', select: 'first_name last_name' })
            .sort({ [fieldSort]: sortBy });

        if (recipes) {
            res.status(200).json({
                status: 200,
                message: `Get ${dishType} success`,
                page,
                total_recipes: recipes.length,
                total_pages: Math.ceil(recipes.length / size),
                latest: latestRecipes[0],
                recipes,
            });
        }
    }
}

module.exports = new RecipeController();

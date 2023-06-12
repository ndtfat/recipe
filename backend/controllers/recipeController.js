const UserModel = require('../models/User');
const RecipeModel = require('../models/Recipe');

class RecipeController {
    // [POST] /recipe/add
    add(req, res) {
        console.log('add recipe');
        const newRecipe = new RecipeModel({ ...req.body });
        newRecipe
            .save()
            .then((data) => res.status(200).json({ status: 200, message: 'add recipe successful', recipe: data }))
            .catch((err) => {
                if (err.name === 'ValidationError')
                    return res.status(403).json({ status: 403, message: 'ValidationError', err: err });
                else return res.status(500).json({ status: 500, message: 'server err', err: err });
            });
    }

    // [GET] /recipe/:id?page=
    async getUserRecipes(req, res) {
        try {
            const id = req.params.id;
            const user = req.user;
            let page = Number(req.query.page);

            if (!page || page < 1) page = 1;
            const size = 12;
            const skip = size * (page - 1);

            let findCondition = { author: id, isPublic: true };

            // user's own recipes
            if (id === user._id || user.isAdmin) {
                findCondition = { author: id };
            }

            const total_recipes = await RecipeModel.countDocuments(findCondition);
            const recipes = await RecipeModel.find(findCondition).skip(skip).limit(size).sort({ createdAt: 'desc' });

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
        try {
            const { saved_recipes } = await UserModel.findById(req.user._id, { saved_recipes: { $slice: 1 } })
                .populate('saved_recipes')
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
}

module.exports = new RecipeController();

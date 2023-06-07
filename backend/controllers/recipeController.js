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
}

module.exports = new RecipeController();

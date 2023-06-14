const bcrypt = require('bcrypt');

const UserModel = require('../models/User');

class UserController {
    // [PUT] /user/update/info
    async updateInfo(req, res) {
        const user = await UserModel.findById(req.user._id);

        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.save()
            .then((data) => {
                const { password, ...otherData } = data;
                res.status(200).json({ status: 200, message: 'Update success', data: { ...otherData._doc } });
            })
            .catch((err) => {
                if (err.name === 'TokenExpiredError')
                    return res.status(403).json({ status: 403, message: 'TokenExpiredError', err });
                return res.status(500).json({ status: 500, message: 'EServer Err', err });
            });
    }

    //[PUT] /user/update/password
    async updatePassword(req, res) {
        const user = await UserModel.findById(req.user._id);
        const isValidPassword = await bcrypt.compare(req.body.current, user.password);

        if (isValidPassword) {
            const newPassword = await bcrypt.hash(req.body.new, 10);
            user.password = newPassword;

            user.save()
                .then(() => res.status(200).json({ status: 200, message: 'Change password Success' }))
                .catch((err) => {
                    if (err.name === 'TokenExpiredError')
                        return res.status(403).json({ status: 403, message: 'TokenExpiredError', err });
                    return res.status(500).json({ status: 500, message: 'Server Err', err });
                });
        } else {
            return res.status(403).json({ status: 403, message: 'Invalid password' });
        }
    }

    //[GET] /user/:id
    async getUserInfo(req, res) {
        console.log('get info: ', req.params.id);
        try {
            const user = await UserModel.findById(req.params.id);
            const { password, saved_recipes, ...otherData } = user._doc;

            res.status(200).json({ status: 200, message: 'Get user_info success', data: otherData });
        } catch (err) {
            console.log(err);
        }
    }

    //[PUT] /user/save-recipe/:id
    async saveRecipe(req, res) {
        console.log(`save: `, req.params.id);

        const user = await UserModel.findById(req.user._id);
        user.saved_recipes.push(req.params.id);

        user.save()
            .then((data) =>
                res.status(200).json({
                    status: 200,
                    message: `Saved recipe (${req.params.id}) success`,
                    saved_recipes: data.saved_recipes,
                }),
            )
            .catch((err) => {
                if (err.name === 'TokenExpiredError')
                    return res.status(403).json({ status: 403, message: 'TokenExpiredError', err });
                return res.status(500).json({ status: 500, message: 'EServer Err', err });
            });
    }

    //[PUT] /user/unsave-recipe/:id
    async unsaveRecipe(req, res) {
        const unsavedId = req.params.id;
        console.log('unsave: ', unsavedId);

        const user = await UserModel.findById(req.user._id);
        user.saved_recipes = user.saved_recipes.filter((id) => id !== unsavedId);

        user.save()
            .then((data) =>
                res.status(200).json({
                    status: 200,
                    message: `Unsaved recipe (${unsavedId}) success`,
                    saved_recipes: data.saved_recipes,
                }),
            )
            .catch((err) => {
                if (err.name === 'TokenExpiredError')
                    return res.status(403).json({ status: 403, message: 'TokenExpiredError', err });
                return res.status(500).json({ status: 500, message: 'EServer Err', err });
            });
    }
}

module.exports = new UserController();

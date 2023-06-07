const authRouter = require('./auth');
const recipeRouter = require('./recipe');

const routes = (app) => {
    app.use('/auth', authRouter);

    app.use('/recipe', recipeRouter);
};

module.exports = routes;

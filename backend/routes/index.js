const authRouter = require('./auth');
const recipeRouter = require('./recipe');
const userRouter = require('./user');

const routes = (app) => {
    app.use('/auth', authRouter);

    app.use('/recipe', recipeRouter);

    app.use('/user', userRouter);
};

module.exports = routes;

const authRouter = require('./auth');
const recipeRouter = require('./recipe');
const userRouter = require('./user');
const reviewRouter = require('./review');

const routes = (app) => {
    app.use('/auth', authRouter);

    app.use('/recipe', recipeRouter);

    app.use('/user', userRouter);

    app.use('/review', reviewRouter);
};

module.exports = routes;

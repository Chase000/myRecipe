const cors = require("koa-cors");
const config = require("../config/app");

const userRouter = require(`../../src/${config.router.prefix}/userRouter`);
const recipeRouter = require(`../../src/${config.router.prefix}/recipeRouter`);
const commentRouter = require(`../../src/${config.router.prefix}/commentRouter`);
const profileRouter = require(`../../src/${config.router.prefix}/profileRouter`);

module.exports = async (app) => {
    app.use(cors());
    app.use(userRouter.routes());
    app.use(recipeRouter.routes());
    app.use(commentRouter.routes());
    app.use(profileRouter.routes());
    return app;
}
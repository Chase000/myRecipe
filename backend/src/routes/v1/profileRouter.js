const router = require('koa-router');
const config = require('../../config/app');
const profileController = require(`../../controller/${config.api.prefix}/profileController`);

const profileRouter = new router();

// user register
profileRouter.post('/register', profileController.register);
// user login
profileRouter.post('/login', profileController.login);
// edit profile by id
profileRouter.put('/editProfile/:id', profileController.edit);
// get profile information by id
profileRouter.get('/editProfile/:id', profileController.index);
// get profile information and user's recipes when entry profile page
profileRouter.get('/myProfile/:id/:isSame', profileController.myProfile);


module.exports = profileRouter;

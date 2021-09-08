const router = require('koa-router')
const config = require('../../config/app');
const userController = require(`../../controller/${config.api.prefix}/userController`)

const userRouter = new router();

userRouter.get('/user',userController.show);
userRouter.get('/user/:id',userController.index);
userRouter.post('/user',userController.insert);
userRouter.put('/user/:id',userController.update);
userRouter.delete('/user/:id',userController.delete);

//click follow button to change follow status /被关注人id/关注人id
userRouter.put('/changeFollowStatus/:followedUserId/:followUserId', userController.changeFollowStatus);

//get user follow list 我关注的人
userRouter.get('/followList/:id', userController.followList);

//get user followed list 关注我的人
userRouter.get('/followedList/:id', userController.followedList);

module.exports = userRouter;
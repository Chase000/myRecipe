const router = require('koa-router')
const config = require('../../config/app');
const commentController = require(`../../controller/${config.api.prefix}/commentController`)

const commentRouter = new router();

commentRouter.get('/comment',commentController.show);
commentRouter.get('/comment/:id',commentController.index);
commentRouter.post('/comment',commentController.insert);
commentRouter.put('/comment/:id',commentController.update);
commentRouter.delete('/comment/:id',commentController.delete);

module.exports = commentRouter;
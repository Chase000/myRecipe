const commentDB = require('../../../models/Comment');
const recipeDB = require('../../../models/Recipe');
const userDB = require('../../../models/User');

exports.show = async(ctx) => {
    try {
        const comment = await commentDB.find({});
        ctx.body = comment;
    } catch (e) {
        ctx.body = e;
    }
}

exports.index = async(ctx) => {
    const commentId = ctx.params.id
    try {
        const comment = await commentDB.findOne({_id: commentId});
        ctx.body = comment;
    } catch (e) {
        ctx.body = e;
    }
}

exports.insert = async(ctx) => {
    const input = ctx.request.body;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    input.modifiedDate = date;
    input.modifiedTime = time;
    const comment = new commentDB(input);
    const recipeId = ctx.request.body.comment_recipeId;
    try {
        await comment.save();
        await recipeDB.updateOne(
            { _id: recipeId },
            { $push: { commentsId: comment._id } }
        );
        const user = await userDB.findOne({ _id: comment.comment_userId }, { name: 1 });
        await commentDB.findByIdAndUpdate({ _id: comment._id }, { comment_userName: user.name })
        ctx.body='create new comment success'
    } catch(e) {
        ctx.body = e;
    }
}

exports.update = async(ctx) => {
    try {
        await commentDB.findByIdAndUpdate(ctx.params.id, ctx.request.body, { rawResult: true }, () => {
            ctx.body = 'update success';
    });
    } catch(e) {
        ctx.body = e;
    }
}

exports.delete = async (ctx) => {
    try {
        const comment = await commentDB.findOne({_id: ctx.params.id}, {comment_recipeId: 1});
        const recipeId = comment.comment_recipeId
        await recipeDB.updateOne({_id:recipeId}, {$pull:{commentsId: comment._id}})
        await commentDB.findByIdAndRemove({
            _id: ctx.params.id            
        });
        ctx.body = 'delete success';
    } catch (e) {
        ctx.body = e;
    }
};
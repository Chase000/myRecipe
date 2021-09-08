const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    comment_userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    comment_userName: {
        type: String,
    },
    comment_recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
    },
    content: {
        type: String,
    },
    modifiedDate: {
        type: String,
    },
    modifiedTime: {
    type: String,
    }
});

const commentDB = mongoose.model("Comment", commentSchema);
module.exports = commentDB;
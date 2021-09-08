const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    followIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    followedIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    fansLikeRecipes: [
        mongoose.Schema.Types.ObjectId,
    ]
});

const userDB = mongoose.model("User", userSchema);
module.exports = userDB;
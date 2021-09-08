const recipeDB = require('../../../models/Recipe');
const userDB = require('../../../models/User');
const commentDB = require('../../../models/Comment');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

exports.show = async ctx => {
  try {
    const recipe = await recipeDB.find({});
    ctx.body = recipe;
  } catch (e) {
    ctx.body = e;
  }
};

exports.index = async ctx => {
  const recipeId = ctx.params.id;
  try {
    const recipe = await recipeDB.findOne(
      {
        _id: recipeId,
      },
      {
        picture: 1,
        recipeName: 1,
        type: 1,
        method: 1,
        ingredients: 1,
        isPrivate: 1
      }
    );
    ctx.body = recipe;
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.insert = async ctx => {
  const input = ctx.request.body;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  input.modifiedDate = date;
  input.modifiedTime = time;
  input.userId = ctx.params.id;
  const recipe = new recipeDB(input);
  try {
    await recipe.save();
    const recipeId = recipe._id;
    ctx.body = {
      message: 'create new recipe success',
      recipeId: recipeId,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.update = async ctx => {
  const input = ctx.request.body;
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  input.modifiedDate = date;
  input.modifiedTime = time;
  try {
    await recipeDB.findByIdAndUpdate(ctx.params.id, input);
    ctx.body = 'update success';
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.delete = async ctx => {
  const recipeId = ctx.params.id;
  try {
    const recipe = await recipeDB.findOne({
      _id: recipeId,
    });
    recipe.commentsId.map(async item => {
      const commentId = item.toString();
      await commentDB.deleteOne({ _id: ObjectId(commentId) });
    });
    await recipeDB.findByIdAndRemove(ctx.params.id);
    ctx.body = 'delete success';
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.recipeCardDetail = async ctx => {
  const recipeId = mongoose.Types.ObjectId(ctx.params.id);
  try {
    const recipeCardDetail = await recipeDB.aggregate([
      {
        $match: {
          _id: recipeId,
        },
      },
      {
        $unwind: {
          path: '$commentsId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'commentsId',
          foreignField: '_id',
          as: 'comment',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$comment',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          picture: { $addToSet: '$picture' },
          recipeName: { $addToSet: '$recipeName' },
          type: { $addToSet: '$type' },
          isPrivate: { $addToSet: '$isPrivate' },
          method: { $addToSet: '$method' },
          ingredients: { $addToSet: '$ingredients' },
          userId: { $addToSet: '$userId' },
          userName: { $addToSet: '$user.name' },
          comments: {
            $addToSet: {
              commentId: '$comment._id',
              commentContent: '$comment.content',
              commentUserId: '$comment.comment_userId',
              commentUserName: '$comment.comment_userName',
              commentModifiedDate: '$comment.modifiedDate',
              commentModifiedTime: '$comment.modifiedTime',
            },
          },
          favorites_IDs: { $addToSet: '$favorites_IDs' },
        },
      },
      {
        $unwind: {
          path: '$ingredients',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$picture',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$recipeName',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$type',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$method',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$userId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$userName',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$favorites_IDs',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$isPrivate',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          'comments.commentModifiedDate': -1,
          'comments.commentModifiedTime': -1,
        },
      },
      { $match: {} },
      {
        $group: {
          _id: '$_id',
          picture: { $addToSet: '$picture' },
          recipeName: { $addToSet: '$recipeName' },
          type: { $addToSet: '$type' },
          isPrivate: { $addToSet: '$isPrivate' },
          method: { $addToSet: '$method' },
          ingredients: { $addToSet: '$ingredients' },
          userId: { $addToSet: '$userId' },
          userName: { $addToSet: '$userName' },
          comments: { $push: '$comments' },
          favorites_IDs: { $addToSet: '$favorites_IDs' },
        },
      },
      {
        $unwind: {
          path: '$ingredients',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$picture',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$recipeName',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$type',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$method',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$userId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$isPrivate',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$userName',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$favorites_IDs',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    ctx.body = {
      recipeCardDetail: recipeCardDetail,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.getLikeStatus = async ctx => {
  const recipeId = ctx.params.recipeId;
  const userId = ctx.params.userId;
  try {
    const like_recipe = await recipeDB.findOne({
      _id: recipeId,
      favorites_IDs: { $in: userId },
    });
    const recipe = await recipeDB.findOne({
      _id: recipeId,
    });
    !!like_recipe
      ? (ctx.body = {
          liked: true,
          likeNum: recipe.favorites_IDs.length,
        })
      : (ctx.body = {
          liked: false,
          likeNum: recipe.favorites_IDs.length,
        });
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.changeLikeStatus = async ctx => {
  const recipeId = ctx.params.recipeId;
  const userId = ctx.params.userId;
  try {
    const like_recipe = await recipeDB.findOne({
      _id: recipeId,
      favorites_IDs: { $in: userId },
    });
    !!like_recipe
      ? await recipeDB.findByIdAndUpdate(recipeId, {
          $pull: { favorites_IDs: userId },
        })
      : await recipeDB.findByIdAndUpdate(recipeId, {
          $addToSet: { favorites_IDs: userId },
        });
    ctx.body = 'update like status success';
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.followRecommendation = async ctx => {
  const userId = mongoose.Types.ObjectId(ctx.params.id);
  try {
    const user = await userDB.findOne(
      {
        _id: userId,
      }
    )
    let followRecommendationRecipes = []
    if (user.followIds.length !== 0) {
      followRecommendationRecipes = await userDB.aggregate([
        {
          $match: {
            _id: userId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'followIds',
            foreignField: '_id',
            as: 'followUsers',
          },
        },
        {
          $unwind: {
            path: '$followUsers',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'recipes',
            localField: 'followUsers._id',
            foreignField: 'userId',
            as: 'recommendationRecipe',
          },
        },
        
        {
          $unwind: {
            path: '$recommendationRecipe',
          },
        },
 
        {
          $project: {
            _id: 0,
            recommendationRecipe: 1,
          },
        },
        {
          $match: {
            "recommendationRecipe.isPrivate": false
          },
        },
        {
          $project: {
            _id: '$recommendationRecipe._id',
            recipeName: '$recommendationRecipe.recipeName',
            type: '$recommendationRecipe.type',
            isPrivate: '$recommendationRecipe.isPrivate',
            favorites_IDs: '$recommendationRecipe.favorites_IDs',
            favoriteNum: { $size: '$recommendationRecipe.favorites_IDs' },
            userId: '$recommendationRecipe.userId',
            picture: '$recommendationRecipe.picture',
            modifiedDate: '$recommendationRecipe.modifiedDate',
            modifiedTime: '$recommendationRecipe.modifiedTime',
          },
        },
        {
          $sort: {
            modifiedDate: -1,
            modifiedTime: -1,
          },
        },
      ]);
    }
    ctx.body = followRecommendationRecipes;
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.similarRecipe = async ctx => {
  const recipeId = ctx.params.id;
  try {
    const recipe = await recipeDB.findOne(
      {
        _id: recipeId,
      },
      {
        ingredients: 1,
      }
    );
    let finalResult = [];
    const ingredients = recipe.ingredients;
    const allRecipe = await recipeDB.find({ _id: { $ne: recipeId },isPrivate: false });
    allRecipe.map(temRecipe => {
      const temIngredients = temRecipe.ingredients;
      let matchNum = 0;
      if (temIngredients.length !== 0) {
        temIngredients.map(temIngredient => {
          if (ingredients.includes(temIngredient)) {
            matchNum += 1;
          }
        });
      }
      const matchResult = {
        id: temRecipe._id,
        recipeName: temRecipe.recipeName,
        isPrivate: temRecipe.isPrivate,
        type: temRecipe.type,
        likeNum: temRecipe.favorites_IDs.length,
        picture: temRecipe.picture,
        similar: matchNum,
      };
      if (matchResult.similar > 0) finalResult.push(matchResult);
    });
    finalResult.sort((a, b) => parseFloat(b.similar) - parseFloat(a.similar));
    ctx.body = finalResult;
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.likeSortedRecipes = async ctx => {
  try {
    const recipes = await recipeDB.aggregate([
      {
        $match: {
          _id: { $exists : true },
          isPrivate: false,
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          recipeName: 1,
          userId: 1,
          picture:1,
          type:1,
          isPrivate:1,
          userName: '$user.name',
          likeNum: {$size: '$favorites_IDs'}
        }
      },
      {
        $unwind: {
          path: '$userName',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          'likeNum': -1
        }
      }
    ])
    ctx.body = recipes;
  } catch (e) {
    ctx.body = e;
  }
};

exports.search = async ctx => {
  let res = [] 
  let recipeList = []
  try {
    if (ctx.params.items) {
      let search = ctx.params.items.split(" ");
      await Promise.all(search.map(async item => {
        const itemStr = eval(`/${item}/i`)
        const recipes = await recipeDB.find(
          {
            $or: [
              {recipeName: {$regex: itemStr}},
              {type: {$regex: itemStr}},
              {ingredients: {$regex: itemStr}},
              {method: {$regex: itemStr}}
            ],
            isPrivate: false,
          },
          {
            _id: 1,
          },
        )
        recipes.map(recipe => {
          const id = recipe._id
          if (recipeList[0]) {
            if (recipeList.every(el => el._id !== id)) {recipeList.push(recipe._id)};
          } else {
            recipeList.push(recipe._id)
          }
        })
      }));
      const ids = recipeList.reduce(function (allIds, id) {
        if (id in allIds) {
          allIds[id]++;
        }
        else {
          allIds[id] = 1;
        }
        return allIds;
      }, {});
      let objectIdArray = Object.keys(ids).map(s => mongoose.Types.ObjectId(s));
      res = await recipeDB.aggregate([
        {
          $match: {_id:{ $in: objectIdArray}}
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id:1,
            recipeName:1,
            picture: 1,
            type: 1,
            isPrivate: 1,
            userId: 1,
            userName: '$user.name',
            likeNum: {$size: '$favorites_IDs'}
          }
        }
      ])
      res.map(recipe => {
        const id = recipe._id
        recipe['matchNum'] = ids[id]
      })
      res.sort((a, b) => parseFloat(b.matchNum) - parseFloat(a.matchNum));
    }
    ctx.body = res;
  } catch (e) {
    ctx.body = e;
  }
};

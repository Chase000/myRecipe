const userDB = require('../../../models/User');
const recipeDB = require('../../../models/Recipe');
const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectID;

exports.register = async ctx => {
  try {
    const email = ctx.request.body.email;
    const user = await userDB.findOne({ email: email });
    user
      ? ((ctx.body = {
          message: 'This email has been registered.',
        }),
        (ctx.status = 400))
      : (await new userDB(ctx.request.body).save(),
        (ctx.body = {
          message: 'create new user success',
        }),
        (ctx.status = 200));
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.login = async ctx => {
  try {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    let token = '';
    const user = await userDB.findOne({ email: email });
    const userId = user._id;
    user && user.password === password
      ? ((token = uuid.v4()),
        (ctx.body = {
          token: token,
          id: userId,
          message: 'login success.',
        }),
        (ctx.status = 200))
      : ((ctx.body = {
          message: 'email not found or wrong password',
        }),
        (ctx.status = 400));
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.edit = async ctx => {
  const id = ctx.params.id;
  try {
    await userDB.updateOne(
      { _id: id },
      {
        $set: ctx.request.body,
      }
    );
    ctx.body = {
      message: 'update success',
    };
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.index = async ctx => {
  const userId = ctx.params.id;
  try {
    const user = await userDB.findOne({ _id: userId });
    const userName = user.name;
    const password = user.password;
    const email = user.email;
    ctx.body = {
      name: userName,
      password: password,
      email: email,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
  }
};

exports.myProfile = async ctx => {
  const userId = ctx.params.id;
  const isSame = ctx.params.isSame;
  try {
    isSame === 'true'
      ? (recipes = await recipeDB.find(
          {
            userId: userId,
          },
          {
            picture: 1,
            recipeName: 1,
            type: 1,
            method: 1,
            ingredients: 1,
            favorites_IDs: 1,
            isPrivate: 1,
          }
        ))
      : (recipes = await recipeDB.find(
          {
            userId: userId,
            isPrivate: false,
          },
          {
            picture: 1,
            recipeName: 1,
            type: 1,
            method: 1,
            ingredients: 1,
            favorites_IDs: 1,
            isPrivate: 1,
          }
        ));
    const userLikedNum = await recipeDB.aggregate([
      {
        $match: { userId: ObjectId(userId) },
      },
      {
        $unwind: '$favorites_IDs',
      },
      {
        $group: {
          _id: '$userId',
          count: { $sum: 1 },
        },
      },
    ]);
    const userInformation = await userDB.findOne(
      {
        _id: userId,
      },
      {
        name: 1,
        email: 1,
        followIds: 1,
        followedIds: 1,
      }
    );
    ctx.body = {
      userInformation: userInformation,
      recipes: recipes,
      userLikedNum: userLikedNum.length !== 0 ? userLikedNum[0].count : 0,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

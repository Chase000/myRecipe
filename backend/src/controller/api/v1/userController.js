const userDB = require('../../../models/User');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

exports.show = async ctx => {
  try {
    const user = await userDB.find({});
    ctx.body = user;
  } catch (e) {
    ctx.body = e;
  }
};

exports.index = async ctx => {
  const userId = ctx.params.id;
  try {
    const user = await userDB.findOne({ _id: userId });
    ctx.body = user;
  } catch (e) {
    ctx.body = e;
  }
};

exports.insert = async ctx => {
  const user = new userDB(ctx.request.body);
  try {
    await user.save();
    ctx.body = 'create new user success';
  } catch (e) {
    ctx.body = e;
  }
};

exports.update = async ctx => {
  try {
    await userDB.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      { rawResult: true },
      () => {
        ctx.body = 'update success';
      }
    );
  } catch (e) {
    ctx.body = e;
  }
};

exports.delete = async ctx => {
  try {
    await userDB.findByIdAndRemove({
      _id: ctx.params.id,
    });
    ctx.body = 'delete success';
  } catch (e) {
    ctx.body = e;
  }
};

exports.changeFollowStatus = async ctx => {
  const followedUserId = ctx.params.followedUserId;
  const followUserId = ctx.params.followUserId;
  try {
    const followedUser = await userDB.findOne(
      {
        _id: followedUserId,
        followedIds: { $in: followUserId },
      },
      {
        followedIds: 1,
      }
    );
    !!followedUser
      ? (await userDB.findByIdAndUpdate(followedUserId, {
          $pull: { followedIds: followUserId },
        }),
        await userDB.findByIdAndUpdate(followUserId, {
          $pull: { followIds: followedUserId },
        }),
        (ctx.body = {
          message: 'cancel follow success',
        }))
      : (await userDB.findByIdAndUpdate(followedUserId, {
          $addToSet: { followedIds: followUserId },
        }),
        await userDB.findByIdAndUpdate(followUserId, {
          $addToSet: { followIds: followedUserId },
        }),
        (ctx.body = {
          message: 'follow success',
        }));
    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.followList = async ctx => {
  const userId = mongoose.Types.ObjectId(ctx.params.id);
  // console.log(userId);
  try {
    const followList = await userDB.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $unwind: {
          path: '$followIds',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followIds',
          foreignField: '_id',
          as: 'follows',
        },
      },
      {
        $unwind: {
          path: '$follows',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          followUserId: '$follows._id',
          followUserName: '$follows.name',
        },
      },
    ]);

    if (followList.length === 1 && followList[0].followUserName === undefined) {
      ctx.body = [];
    } else {
      ctx.body = followList;
    }

    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

exports.followedList = async ctx => {
  const userId = mongoose.Types.ObjectId(ctx.params.id);
  try {
    const followedList = await userDB.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $unwind: {
          path: '$followedIds',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'followedIds',
          foreignField: '_id',
          as: 'followeds',
        },
      },
      {
        $unwind: {
          path: '$followeds',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          followedUserId: '$followeds._id',
          followedUserName: '$followeds.name',
        },
      },
    ]);
    if (
      followedList.length === 1 &&
      followedList[0].followedUserId === undefined
    ) {
      ctx.body = [];
    } else {
      ctx.body = followedList;
    }

    ctx.status = 200;
  } catch (e) {
    ctx.body = e;
    ctx.status = 404;
  }
};

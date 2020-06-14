const Collect = require("../models/collects");
const Type = require("../models/types");
const Singer = require("../models/singers");
const { getJWTPayload } = require("../config/token");

// 获取收藏
exports.getCollect = async (ctx) => {
  const { authorization } = ctx.request.header;
  const payload = getJWTPayload(authorization);
  const { id } = payload;
  try {
    let list = await Collect.find({
      user: id,
    }).populate("song");
    const promiseList = list.map(async (item) => {
      const type = await Type.findById(item.song.type);
      const singer = await Singer.findById(item.song.singer);
      const res = {
        song: {
          ...item._doc.song._doc,
          type,
          singer,
        },
        _id: item._id,
      };
      return res;
    });

    const result = await Promise.all(promiseList);

    ctx.body = {
      code: 200,
      msg: "获取成功",
      result,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 创建收藏
exports.newCollect = async (ctx) => {
  let { songId: song } = ctx.request.body;
  const { authorization } = ctx.request.header;
  const payload = getJWTPayload(authorization);
  const { id } = payload;
  try {
    console.log(song, id);
    const isCollect = await Collect.find({ song, user: id });
    if (isCollect.length) {
      return (ctx.body = {
        code: 200,
        msg: "已收藏该歌曲",
      });
    }
    await Collect.create({
      song,
      user: id,
    });
    ctx.body = {
      code: 200,
      msg: "创建成功",
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 删除收藏
exports.delCollect = async (ctx) => {
  const { songId } = ctx.request.body;
  const { authorization } = ctx.request.header;
  const payload = getJWTPayload(authorization);
  const { id } = payload;
  try {
    const res = await Collect.remove({
      song: songId,
      user: id,
    });
    ctx.body = {
      code: 200,
      msg: "删除成功",
      res,
    };
  } catch (error) {
    // console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

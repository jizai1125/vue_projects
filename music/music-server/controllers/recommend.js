const Recommend = require("../models/recommends");
const Type = require("../models/types");
const Singer = require("../models/singers");
const { getJWTPayload } = require("../config/token");

// 获取推荐
exports.getRecommend = async (ctx) => {
  try {
    const list = await Recommend.find().populate("song");
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

// 创建推荐
exports.newRecommend = async (ctx) => {
  let { songId: song } = ctx.request.body;
  const { authorization } = ctx.request.header;
  const payload = getJWTPayload(authorization);
  const { id } = payload;
  try {
    const isAdd = await Recommend.findOne({ song });
    if (isAdd) {
      return (ctx.body = {
        code: 400,
        msg: "已添加此歌曲",
      });
    }
    await Recommend.create({
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

// 删除推荐
exports.delRecommend = async (ctx) => {
  const { id: _id } = ctx.request.body;
  try {
    const res = await Recommend.findByIdAndRemove(_id);
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

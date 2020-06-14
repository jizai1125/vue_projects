const Singer = require("../models/singers");

// 获取歌手
exports.getSinger = async (ctx) => {
  try {
    const list = await Singer.find();
    ctx.body = {
      code: 200,
      msg: "获取成功",
      result: list,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 创建歌手
exports.newSinger = async (ctx) => {
  let { name, pic } = ctx.request.body;
  try {
    const isAdd = await Singer.findOneAndUpdate(
      { name },
      {
        name,
        pic,
      }
    );
    if (isAdd) {
      return (ctx.body = {
        code: 200,
        result: isAdd,
        msg: "该歌手已添加",
      });
    } else {
       const singer = await Singer.create({
         name,
         pic,
       });
      ctx.body = {
        code: 200,
        msg: "创建成功",
        result: singer,
      };
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 删除歌手
exports.delSinger = async (ctx) => {
  const { id: _id } = ctx.request.body;
  try {
    await Singer.findByIdAndRemove(_id);
    ctx.body = {
      code: 200,
      msg: "删除成功"
    };
  } catch (error) {
    // console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

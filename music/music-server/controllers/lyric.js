const Lyric = require("../models/lyrics");
const { getJWTPayload } = require("../config/token");
const { readFiletoBase64 } = require("../utils/file");

// 获取歌词
exports.getLyric = async (ctx) => {
  const { mid } = ctx.request.query;
  let condition = {};
  if (mid) {
    condition.song = mid;
  }
  try {
    const list = await Lyric.find(condition).select("-song");
    ctx.body = {
      code: 200,
      msg: "获取成功",
      result: list[0],
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 创建歌词
exports.newLyric = async (ctx) => {
  let { songId: song, filepath } = ctx.request.body;
  console.log(filepath);
  try {
    const base64Str = readFiletoBase64(filepath);

    await Lyric.create({
      song,
      content: `${base64Str}`,
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

// 更改歌词
exports.editLyric = async (ctx) => {
  let { songId: song, filepath } = ctx.request.body;
  console.log(filepath);
  try {
    const base64Str = readFiletoBase64(filepath);
    await Lyric.findOneAndUpdate(
      {
        song,
      },
      {
        content: `${base64Str}`,
      }
    );
    ctx.body = {
      code: 200,
      msg: "修改成功",
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 删除歌词
exports.delLyric = async (ctx) => {
  const { id: _id } = ctx.request.body;
  try {
    const res = await Lyric.findByIdAndRemove(_id);
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

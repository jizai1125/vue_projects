const Song = require("../models/songs");
const Lyric = require("../models/lyrics");

// 模糊搜索
exports.querySong = async (ctx) => {
  const { query } = ctx.request.query;
  let condition = {};
  console.log(query);
  if (!query.trim()) {
    return (ctx.body = {
      code: 200,
      msg: "获取成功",
      result: [],
    });
  }
  if (query) {
    let queryReg = new RegExp(query, "i");
    condition = { $or: [{ title: queryReg }] };
  }

  try {
    const list = await Song.find(condition).populate("type singer");

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

// 获取歌曲
exports.getSong = async (ctx) => {
  const { sid } = ctx.request.query;
  let condition = {};
  if (sid) {
    condition.singer = sid;
  }

  try {
    const list = await Song.find(condition).populate("type singer");
    const promiseList = list.map(async (item) => {
      const hasLyric = await Lyric.find({ song: item._id }).select("-content");
      const res = {
        ...item._doc,
        hasLyric: Boolean(hasLyric.length),
      };
      return res;
    });
    const result = await Promise.all(promiseList);
    ctx.body = {
      code: 200,
      msg: "获取成功",
      result: result,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 创建歌曲
exports.newSong = async (ctx) => {
  let { title, url, typeId: type, singerId: singer } = ctx.request.body;
  try {
    await Song.create({
      title,
      url,
      type,
      singer,
    });
    ctx.body = {
      code: 200,
      msg: "创建成功",
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 编辑歌曲
exports.editSong = async (ctx) => {
  let { songId, title, url, typeId: type, singerId: singer } = ctx.request.body;
  try {
    await Song.findByIdAndUpdate(songId, {
      title,
      url,
      type,
      singer,
    });
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

// 删除歌曲
exports.delSong = async (ctx) => {
  const { id: _id } = ctx.request.body;
  try {
    const res = await Song.findByIdAndRemove(_id);
    ctx.body = {
      code: 200,
      msg: "删除成功",
    };
  } catch (error) {
    // console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

const SearchHis = require("../models/search_his");
const { getJWTPayload } = require("../config/token");

// 获取搜索历史
exports.getSearchHis = async (ctx) => {
  const { id } = _getPayload(ctx);
  try {
    let list = await SearchHis.find({ user: id })
      .select("-_id")
      .sort({ _id: -1 });
    list = list.map((item) => item.keyword);
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

// 创建搜索历史
exports.newSearchHis = async (ctx) => {
  let { keyword } = ctx.request.body;
  const { id } = _getPayload(ctx);
  try {
    await SearchHis.findOneAndRemove({ keyword });
    await SearchHis.create({
      keyword,
      user: id,
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

// 删除搜索历史
exports.delSearchHis = async (ctx) => {
  const { keyword } = ctx.request.body;
  const { id } = _getPayload(ctx);
  try {
    console.log(id, keyword);
    const res = await SearchHis.findOneAndRemove({ user: id, keyword });
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

// 清空搜索历史
exports.clearSearchHis = async (ctx) => {
  const { id } = _getPayload(ctx);
  try {
    const res = await SearchHis.remove({ user: id });
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

// 获取登录用户信息
function _getPayload(ctx) {
  const { authorization } = ctx.request.header;
  const payload = getJWTPayload(authorization);
  return payload
}

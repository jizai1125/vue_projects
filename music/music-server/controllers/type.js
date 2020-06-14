const Type = require("../models/types");

// 获取类别
exports.getType = async (ctx) => {
  try {
    const list = await Type.find().sort({_id: -1});
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

// 创建类别
exports.newType = async (ctx) => {
  let { name } = ctx.request.body;
  try {
    const isAdd = await Type.findOne({
      name,
    });
    if (isAdd) {
      return (ctx.body = {
        code: 400,
        msg: "该类别已添加",
      });
    }
    await Type.create({
      name,
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

// 编辑类别
exports.editType = async (ctx) => {
  const { id, name } = ctx.request.body;
  try {
    const res = await Type.findByIdAndUpdate(id, {
      name,
    });
    ctx.body = {
      code: 200,
      msg: "修改成功",
      res
    };
  } catch (error) {
     ctx.body = {
       code: 500,
       msg: "错误",
     };
  }
};

// 删除类别
exports.delType = async (ctx) => {
  const { id: _id } = ctx.request.body;
  try {
    const res = await Type.findByIdAndRemove(_id);
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

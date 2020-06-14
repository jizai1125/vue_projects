const User = require("../models/users");
const { generateHash, vertify } = require("../config/bcrypt");
const { getToken, getJWTPayload } = require("../config/token");

// 注册
exports.register = async (ctx) => {
  let { name, password, role, avatar } = ctx.request.body;
  // const { authorization } = ctx.request.header;
  try {
    // const payload = getJWTPayload(authorization);
    // const { role: currRole } = payload;
    // if (currRole !== "admin") {
    //   return (ctx.body = {
    //     code: 402,
    //     msg: "无权限",
    //   });
    // }
    const isRegister = await User.findOne({
      name,
    });

    if (isRegister) {
      return (ctx.body = {
        code: 400,
        msg: "该账户已注册",
      });
    }
    password = generateHash(password);
    await User.create({
      name,
      password,
      role,
      avatar,
    });
    ctx.body = {
      code: 200,
      msg: "注册成功",
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "错误",
    };
  }
};

// 登录
exports.login = async (ctx) => {
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    return (ctx.body = {
      code: 400,
      msg: "参数不合法",
    });
  }
  try {
    let user = await User.findOne({
      name,
    });
    if (!user) {
      return (ctx.body = {
        code: 400,
        msg: "用户名或密码错误",
      });
    }
    // 验证密码
    if (!vertify(password, user.password)) {
      return (ctx.body = {
        code: 400,
        msg: "用户名或密码错误",
      });
    }
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    const token = getToken(payload);
    return (ctx.body = {
      code: 200,
      result: { token },
      msg: "登录成功",
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      code: 500,
      msg: "错误",
    });
  }
};

// 获取用户列表
exports.getUser = async (ctx) => {
  const { authorization } = ctx.request.header;
  // 判断当前用户角色
  try {
    const payload = getJWTPayload(authorization);
    const { name, role } = payload;
    if (role !== "admin") {
      return (ctx.body = {
        code: 402,
        msg: "无权限",
      });
    }
    const result = await User.find()
      .nor([{ role: "admin" }])
      .select("-password");
    ctx.body = {
      code: 200,
      msg: "",
      result,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "查询失败",
    };
  }
};

// 删除用户
exports.delUser = async (ctx) => {
  const { id } = ctx.request.body;
  const { authorization } = ctx.request.header;
  // 判断当前用户角色
  try {
    const payload = getJWTPayload(authorization);
    const { name, role } = payload;
    if (role !== "admin") {
      return (ctx.body = {
        code: 402,
        msg: "无权限",
      });
    }
    await User.findByIdAndRemove(id);
    ctx.body = {
      code: 200,
      msg: "删除成功",
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "查询失败",
    };
  }
};

// 修改用户信息
exports.editUser = async (ctx) => {
  const { id, avatar, name } = ctx.request.body;
  const { authorization } = ctx.request.header;
  // 判断当前用户角色
  try {
    const payload = getJWTPayload(authorization);
    const { role } = payload;
    if (role !== "admin") {
      return (ctx.body = {
        code: 402,
        msg: "无权限",
      });
    }
    await User.findByIdAndUpdate(id, {
      avatar,
      name,
    });
    ctx.body = {
      code: 200,
      msg: "删除成功",
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: "查询失败",
    };
  }
};

// 获取用户信息
exports.getUserInfo = async (ctx) => {
  const { authorization } = ctx.request.header;
  try {
    const payload = getJWTPayload(authorization);
    const { id } = payload;
    const user = await User.findById(id).select('-password');
    ctx.body = {
      code: 200,
      msg: "",
      result: user,
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: "查询失败",
    };
  }
};


// 修改密码
exports.editUserPwd = async (ctx) => {
  const { authorization } = ctx.request.header;
  let { oldPwd, newPwd } = ctx.request.body;

  try {
    const payload = getJWTPayload(authorization);
    const { id } = payload;
    // 先判断旧密码是否正确
    let user = await User.findById(id)
    if (!vertify(oldPwd, user.password)) {
      return (ctx.body = {
        code: 400,
        msg: '旧密码错误',
      });
    }
    // 修改密码
    let password = generateHash(newPwd);
    await User.findByIdAndUpdate(id, {
      password
    })
    ctx.body = {
      code: 200,
      msg: '修改成功',
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: 500,
      msg: '修改失败',
    };
  }
};

import request from "src/utils/request";

// 登录
export function login({ name, password }) {
  return request
    .post("/users/login", {
      name,
      password
    })
    .then(
      (res) => {
        return Promise.resolve(res.result);
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );
}

// 注册
export function register({ name, password }) {
  return request
    .post("/users/register", {
      name,
      password
    })
    .then(
      (res) => {
        return Promise.resolve(res.result);
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );
}

// 获取用户信息
export function getUserInfo() {
  return request
    .get("/users/info")
    .then(
      (res) => {
        return Promise.resolve(res.result);
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );
}

// 修改密码
export function editPwd({ oldPwd, newPwd }) {
  return request
    .post("/users/editPwd", {
      oldPwd,
      newPwd
    })
    .then(
      (res) => {
        return Promise.resolve(res);
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );
}

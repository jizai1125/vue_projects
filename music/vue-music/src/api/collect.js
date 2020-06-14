import request from "src/utils/request";

// 获取收藏列表
export function getCollect() {
  return request.get("/collect/list").then(
    (res) => {
      return Promise.resolve(res.result);
    },
    (err) => {
      console.log(err);
    }
  );
}

// 添加收藏
export function addCollect(songId) {
  return request
    .post("/collect/new", {
      songId,
    })
    .then(
      (res) => {
        return Promise.resolve(res.result);
      },
      (err) => {
        console.log(err);
      }
    );
}

// 取消收藏
export function delCollect(songId) {
  return request
    .delete("/collect/delete", {
      data: { songId },
    })
    .then(
      (res) => {
        return Promise.resolve(res.result);
      },
      (err) => {
        console.log(err);
      }
    );
}

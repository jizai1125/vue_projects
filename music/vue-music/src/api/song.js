import request from "src/utils/request";

// 获取歌词
export function getLyric(mid) {
  return request
    .get("/lyric/list", {
      params: { mid },
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

// 模糊查询歌曲
export function querySong(query) {
  return request
    .get("/song/search", {
      params: { query },
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

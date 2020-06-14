import request from "src/utils/request";

// 获取歌手列表
export function getSingerList() {
  return request.get("/singer/list").then(
    (res) => {
      return Promise.resolve(res.result);
    },
    (err) => {
      console.log(err);
    }
  );
}

// 获取歌曲
export function getSingerSong({ sid }) {
  return request
    .get("/song/list", {
      params: { sid },
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

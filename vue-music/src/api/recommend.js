import axios from "axios";
import { commonParams } from "./config";

export function getRecommend() {
  return axios
    .get("/api/getRecommendList", {
      params: commonParams
    })
    .then(
      res => Promise.resolve(res.data),
      err => {
        console.log(err);
      }
    );
}
export function getDiscList() {
  return axios
    .get("/api/getSong", {
      params: {
        "-": "recom6354329590108696",
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: "json",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data: {
          comm: { ct: 24 },
          recomPlaylist: {
            method: "get_hot_recommend",
            param: { async: 1, cmd: 2 },
            module: "playlist.HotRecommendServer"
          }
        }
      }
    })
    .then(
      res => Promise.resolve(res.data),
      err => {
        console.log(err);
      }
    );
}

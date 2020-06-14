import axios from 'axios'
import { commonParams } from './config'

import request from "src/utils/request";

// 获取推荐列表
export function getRecommendSong() {
  return request.get("/recommend/list").then(
    (res) => {
      return Promise.resolve(res.result);
    },
    (err) => {
      console.log(err);
    }
  );
}

/**
 * 轮播推荐图
 */
export function getRecommend() {
  return axios
    .get('/api/sliderList', {
      params: {
        ...commonParams,
        platform: 'h5',
        needNewCode: 1
      }
    })
    .then(
      res => Promise.resolve(res.data),
      err => {
        console.log('<<<getRecommend ERR>>>')
        console.log(err)
      }
    )
}

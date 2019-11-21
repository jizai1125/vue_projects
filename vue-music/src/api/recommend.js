import axios from 'axios'
import { commonParams } from './config'

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

/**
 * 歌单列表
 */
export function getDiscList() {
  return axios
    .get('/api/recomPlayList', {
      params: {
        ...commonParams,
        '-': 'recom6354329590108696',
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        data: {
          comm: { ct: 24 },
          recomPlaylist: {
            method: 'get_hot_recommend',
            param: { async: 1, cmd: 2 },
            module: 'playlist.HotRecommendServer'
          }
        }
      }
    })
    .then(
      res => Promise.resolve(res.data),
      err => {
        console.log('<<<getDiscList ERR>>>')
        console.log(err)
      }
    )
}

/**
 * 歌单详情
 */
export function getDiscInfo(content_id) {
  return axios
    .get('/api/discInfo', {
      params: {
        ...commonParams,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        new_format: 1,
        disstid: content_id,
        loginUin: 1414589221,
        hostUin: 0,
        inCharset: 'utf8',
        platform: 'yqq.json',
        needNewCode: 0
      }
    })
    .then(
      res => Promise.resolve(res.data),
      err => {
        console.log('<<<getDiscInfo ERR>>>')
        console.log(err)
      }
    )
}

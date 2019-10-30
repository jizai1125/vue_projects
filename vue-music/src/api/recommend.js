import axios from 'axios'
import { commonParams } from './config'

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

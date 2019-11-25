import axios from 'axios'
import { commonParams } from './config'

// 获取各大榜单
export function getRank() {
  return axios
    .get('/api/getRank', {
      params: {
        _: 1574565150122,
        data: {
          'comm': {
            ...commonParams,
            'platform': 'h5',
            'needNewCode': 1,
            'ct': 23,
            'cv': 0
          },
          'topList': {
            'module': 'musicToplist.ToplistInfoServer',
            'method': 'GetAll',
            'param': {}
          }
        }

      }
    })
    .then(
      res => {
        return Promise.resolve(res.data)
      },
      err => {
        console.log(err)
      })
}

// 获取排行榜详情
export function getRankInfo(topId, offset = 0, num = 20) {
  return axios
    .get('/api/getRankInfo', {
      params: {
        ...commonParams,
        '-': 'getUCGI2896762514948745',
        loginUin: 1414589221,
        hostUin: 0,
        inCharset: 'utf8',
        platform: 'yqq.json',
        needNewCode: 0,
        data: {
          'detail': {
            'module': 'musicToplist.ToplistInfoServer',
            'method': 'GetDetail',
            'param': {
              topId, // 不同榜单id
              offset, // 页码
              num, // 条数
              period: new Date().toLocaleDateString().replace(/\//g, '-')
            }
          },
          'comm': {
            'ct': 24,
            'cv': 0
          }
        }
      }
    })
    .then(
      res => {
        return Promise.resolve(res.data)
      },
      err => {
        console.log(err)
      })
}


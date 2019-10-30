import axios from 'axios'
import { commonParams } from './config'

const singerParams = {
  loginUin: 0,
  hostUin: 0,
  platform: 'yqq.json',
  needNewCode: 0
}

export function getSingerList(params) {
  const { area = -100, sex = -100, genre = -100, index = -100, sin = 0, cur_page = 1 } = params
  return axios
    .get('/api/getSingerList', {
      params: {
        ...commonParams,
        ...singerParams,
        '-': 'getUCGI9367610605161005',
        data: {
          comm: { ct: 24, cv: 0 },
          singerList: {
            module: 'Music.SingerListServer',
            method: 'get_singer_list',
            param: {
              area,
              sex,
              genre,
              index,
              sin,
              cur_page
            }
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
      }
    )
}

export function getSongKey(mid) {
  return axios
    .get('/api/getSingerList', {
      params: {
        ...{
          ...commonParams,
          g_tk: '1414589221'
        },
        ...{
          ...singerParams,
          loginUin: '1414589221'
        },
        '-': 'getplaysongvkey5039556266759886',
        uin: '1414589221',
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        data: {
          // 'req': {
          //   'module': 'CDN.SrfCdnDispatchServer',
          //   'method': 'GetCdnDispatch',
          //   'param': {
          //     'guid': '973270494',
          //     'calltype': 0,
          //     'userip': ''
          //   }
          // },
          'req_0': {
            'module': 'vkey.GetVkeyServer',
            'method': 'CgiGetVkey',
            'param': {
              'guid': '973270494',
              'songmid': [mid],
              'songtype': [0],
              'uin': '1414589221',
              'loginflag': 1,
              'platform': '20'
            }
          },
          'comm': {
            'uin': 1414589221,
            'format': 'json',
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
      }
    )
}

export function getSingerSong(params) {
  const { order = 1, singerMid, begin = 0, num = 10 } = params
  return axios
    .get('/api/getSingerList', {
      params: {
        ...commonParams,
        ...singerParams,
        '-': 'getSingerSong8386859577724988',
        data: {
          comm: {
            'ct': 24,
            'cv': 0
          },
          singerSongList: {
            method: 'GetSingerSongList',
            param: {
              order,
              singerMid,
              begin,
              num
            },
            module: 'musichall.song_list_server'
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
      }
    )
}

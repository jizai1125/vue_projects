import axios from 'axios'
import { commonParams } from './config'

export function getLyric(songmid) {
  return axios
    .get('/api/getLyric', {
      params: {
        ...commonParams,
        g_tk: 5381,
        songmid,
        '-': 'MusicJsonCallback_lrc',
        pcachetime: Date.now(),
        loginUin: 1414589221,
        hostUin: 0,
        inCharset: 'utf8',
        format: 'json',
        outCharset: 'utf-8',
        platform: 'yqq.json',
        notice: 0,
        needNewCode: 0
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

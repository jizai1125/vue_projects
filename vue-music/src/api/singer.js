import axios from 'axios'
import { commonParams } from './config'

export function getSingerList(params) {
  const { area = -100, sex = -100, genre = -100, index = -100, sin = 0, cur_page = 1 } = params
  return axios
    .get('/api/getSingerList', {
      params: {
        ...commonParams,
        g_tk: 5381,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        '-': 'getUCGI9367610605161005',
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq.json',
        needNewCode: 0,
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

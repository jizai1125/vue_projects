import axios from 'axios'
import { commonParams } from './config'

// 获取热门搜索关键词
export function getHotKey() {
  return axios
    .get('/api/getHotKey', {
      params: {
        cgiKey: 'GetHomePage',
        _: 1574685242215,
        data: {
          comm: {
            ...commonParams,
            platform: 'h5',
            needNewCode: 1
          },
          MusicHallHomePage: {
            module: 'music.musicHall.MusicHallPlatform',
            method: 'MobileWebHome',
            param: {
              ShelfId: [101, 102, 161]
            }
          },
          hotkey: {
            module: 'tencent_musicsoso_hotkey.HotkeyService',
            method: 'GetHotkeyForQQMusicMobile',
            param: {
              remoteplace: 'txt.miniapp.wxada7aab80ba27074',
              searchid: Date.now()
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

// p（页码）, w（关键词）, catzhida(是否检索歌手)
export function search({ word, page, showSinger, perpage }) {
  return axios
    .get('/api/search', {
      params: {
        ...commonParams,
        perpage,
        p: page,
        w: word,
        catZhida: showSinger ? 1 : '',
        _: 1574853247211,
        platform: 'h5',
        needNewCode: 1,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        n: 20,
        remoteplace: 'txt.mqq.all'
      }
    })
    .then(
      res => {
        return Promise.resolve(res.data)
      },
      err => {
        return Promise.reject(err)
      }
    )
}

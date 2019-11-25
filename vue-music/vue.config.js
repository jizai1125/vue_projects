const path = require('path')
// const express = require('express')
const axios = require('axios')
// const app = express()
// var apiRoutes = express.Router();
// app.use("/api", apiRoutes);
function resolve(params) {
  return path.resolve(__dirname, params)
}
const devServer = {
  port: 9090,
  before(app) {
    app
      // 推荐轮播图
      .get('/api/sliderList', (req, res) => {
        var url =
          'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
        axios
          .get(url, {
            headers: {
              referer: 'https://y.qq.com/m/index.html',
              // host: "y.qq.com",
              'Sec-Fetch-Mode': 'cors',
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0'
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => {
            console.error(err)
          })
      })
      // 推荐歌单列表
      .get('/api/recomPlayList', (req, res) => {
        var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios
          .get(url, {
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => {
            console.error(err)
          })
      })
      // 歌单详情
      .get('/api/discInfo', (req, res) => {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        axios
          .get(url, {
            headers: {
              referer: `https://y.qq.com/n/yqq/playlist/${req.query.disstid}.html`
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => {
            console.error(err)
          })
      })
      // 歌手列表
      .get('/api/getSingerList', (req, res) => {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios
          .get(url, {
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => {
            console.error(err)
          })
      })
      // 歌手详情
      .get('/api/getSingerSong', (req, res) => {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios
          .get(url, {
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => {
            console.error(err)
          })
      })
      // 歌词
      .get('/api/getLyric', (req, res) => {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        axios
          .get(url, {
            headers: {
              referer: 'https://y.qq.com/portal/player.html'
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => { console.log(err) })
      })
      // 排行榜
      .get('/api/getRank', (req, res) => {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios
          .get(url, {
            headers: {
              referer: 'https://y.qq.com/m/index.html?tab=toplist'
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => { console.log(err) })
      })
      // 榜单详情
      .get('/api/getRankInfo', (req, res) => {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios
          .get(url, {
            headers: {
              referer: 'https://y.qq.com/n/yqq/toplist/4.html'
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => { console.log(err) })
      })
  }
}

module.exports = {
  devServer,
  configureWebpack: {
    resolve: {
      alias: {
        src: resolve('src'),
        api: resolve('src/api'),
        common: resolve('src/common'),
        base: resolve('src/base'),
        components: resolve('src/components')
      }
    }
  }
}

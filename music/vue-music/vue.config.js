const path = require('path')
const axios = require('axios')

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

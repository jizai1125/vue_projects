const path = require("path");
const express = require("express");
const axios = require("axios");
const app = express();
// var apiRoutes = express.Router();
// app.use("/api", apiRoutes);
function resolve(params) {
  return path.resolve(__dirname, params);
}
const devServer = {
  before(app) {
    app
      .get("/api/sliderList", function (req, res) {
        var url =
          "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
        axios
          .get(url, {
            headers: {
              referer: "https://y.qq.com/m/index.html",
              // host: "y.qq.com",
              ["Sec-Fetch-Mode"]: "cors",
              ["User-Agent"]:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0"
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .get("/api/recomPlayList", (req, res) => {
        var url = "https://u.y.qq.com/cgi-bin/musicu.fcg";
        axios
          .get(url, {
            params: req.query
          })
          .then(response => {
            res.json(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .get("/api/getSingerList", (req, res) => {
        let url = "https://u.y.qq.com/cgi-bin/musicu.fcg";
        axios
          .get(url, {
            params: req.query
          })
          .then(response => {
            res.json(response.data);
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
}

module.exports = {
  devServer,
  configureWebpack: {
    resolve: {
      alias: {
        src: resolve("src"),
        api: resolve("src/api"),
        common: resolve("src/common"),
        base: resolve("src/base"),
        components: resolve("src/components")
      }
    }
  }
}
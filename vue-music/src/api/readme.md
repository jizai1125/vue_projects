# QQ 音乐 API

### 1. 歌手列表数据

- url: 'https://u.y.qq.com/cgi-bin/musicu.fcg'

```javascript

  method: GET
  params: {
    -: 'getUCGI23450017598781892',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: "json",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 0,
    data: {
      "comm":{
        "ct":24,
        "cv":0
        },
      "singerList":{
        "module":"Music.SingerListServer",
        "method":"get_singer_list",
        "param":{
          "area":-100, // 地区 全部（-100）、内地（200）、港台（2）、欧美（5）、日本（4）、韩国（3）、其他（6）
          "sex":1,  // 歌手性别：全部（-100）、男（0）、女（1）、组合（2）
          "genre":-100,  // 歌曲类型：全部（-100）、 流行（1）、嘻哈（6）、摇滚（2）、电子（4）、民谣（3）、R&B（8）、民歌（10）、轻音乐（9）、爵士（5）、古典（14）、乡村（25）、蓝调（20）
          "index":2,  // 歌手名字第一字的首拼：热门（-100）、A（1）、B（2）、...
          "sin":0,  // 
          "cur_page":1 // 页码
          }
        }
      }
  }

```
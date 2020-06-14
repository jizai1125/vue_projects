<template>
  <div>
    <Search></Search>
    <section class="now">
      <h4>{{city}}</h4>
      <p class="time">{{now.update}} 更新</p>
      <p class="tmp">{{now.tmp}}<span>°</span><span>{{now.desc}}</span>
      </p>
      <p class="air" v-if="now.air">
        {{now.air.qlty}}
        <span>PM2.5: {{now.air.pm25}}</span>
      </p>
    </section>
    <!--三小时-->
    <section class="hourly">
      <h4>未来三小时</h4>
      <div class="wrapper">
        <div class="content">
          <div class="item" v-for="item in hourly" :key="item.time">
            <p>{{item.tmp}}°</p>
            <p>{{item.desc}}</p>
            <p>{{item.time}}</p>
          </div>
        </div>
      </div>
    </section>
    <!--未来7天-->
    <section class="daily">
      <h4>未来7天</h4>
      <div class="wrapper">
        <div class="content">
          <div class="item" v-for="(item, index) in daily" :key="item.time">
            <div class="left">
              <span :class="index === 0 ? 'today' : '' ">
                {{index==0 ? '今天' : item.time}}
              </span>
              <span>{{item.desc_d}}</span>
            </div>
            <div class="right">
              <span>{{item.tmp_min}}°~{{item.tmp_max}}°</span>
              <span class="iconfont icon-duoyun"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--生活指数-->
    <section class="lifestyle">
      <div class="item" v-for="item in lifestyle" :key="item.type">
        <div class="head">
          <img :src="'/static/images/lifestyle_'+item.type+'.png'" alt="">
          <div class="right">
            <p>{{item.type_ch}}</p>
            {{item.brf}}
          </div>
        </div>
        <p class="text">{{item.txt}}</p>
      </div>
    </section>
  </div>
</template>

<script>
  import Search from '@/components/search'

  export default {
    components: {
      Search,
    },
    data() {
      return {
        city: '',
        now: {},
        hourly: [],
        daily: [],
        lifestyle: [],
        lifeType: [
          {
          type: 'comf',
          bref: '舒适度指数'
        }, {
          type: 'cw',
          bref: '洗车指数'
        }, {
          type: 'drsg',
          bref: '穿衣指数'
        }, {
          type: 'flu',
          bref: '感冒指数'
        }, {
          type: 'sport',
          bref: '运动指数'
        }, {
          type: 'trav',
          bref: '旅游指数'
        }, {
          type: 'uv',
          bref: '舒适度指数'
        }, {
          type: 'air',
          bref: '紫外线指数'
        }]
      }
    },
    computed: {
    },
    methods: {
      init() {
        const that = this
        
        wx.getLocation({
          type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
          success(res) {
            // console.dir(res)
            let params = {
              latitude: res.latitude,
              longitude: res.longitude
            }
            // 获取当前天气,空气质量
            that.getNow(params)
            that.getHourly(params)
            that.getDaily(params)
            that.getLifeStyle(params)
          }
        })

      },
      //实时天气
      getNow(params) {
        const that = this
        wx.request({
          url: `${that.globalData.ROOT}/s6/weather/now`,
          data: {
            key: that.globalData.KEY,
            location: `${params.longitude},${params.latitude}`
          },
          success(res) {
            let data = res.data.HeWeather6[0]
            // 获取失败
            if (data.status !== 'ok') {
              console.log('失败')
              return
            }
            that.city = data.basic.location
            let now = {
              update: data.update.loc.slice(5),  // 更新时间
              tmp: data.now.tmp,    // 温度
              desc: data.now.cond_txt,  // 天气状况
              wind_dir: data.now.wind_dir,  // 风向
              wind_sc: data.now.wind_sc,    // 风力
              wind_spd: data.now.wind_spd,  // 风速  公里/小时
              visible: data.now.vis,    // 能见度
              humidity: data.now.hum,    // 湿度
              pcpn: data.now.pcpn   // 降水量
            }
            that.now = now
            //实时空气质量
            wx.request({
              url: `${that.globalData.ROOT}/s6/air/now`,
              data: {
                key: that.globalData.KEY,
                location: data.basic.parent_city
              },
              success(res) {
                let data = res.data.HeWeather6[0]
                now.air = {
                  qlty: data.air_now_city.qlty,   // 空气质量
                  pm25: data.air_now_city.pm25    // pm2.5
                }
                that.now = now
              }
            })
          }
        })

      },
      // 3小时预报
      getHourly(params) {
        const that = this
        wx.request({
          url: `${this.globalData.ROOT}/s6/weather/hourly`,
          data: {
            key: this.globalData.KEY,
            location: `${params.longitude},${params.latitude}`
          },
          success(res) {
            // console.log(res)
            let data = res.data.HeWeather6[0]
            if (data.status !== 'ok') {
              console.log('失败')
              // showToast()
              return
            }
            let hourly = data.hourly
            let result = []
            hourly.map(item => {
              result.push({
                time: item.time.split(' ')[1],
                tmp: item.tmp,
                desc: item.cond_txt,
                pop: item.pop,
                hum: item.hum,
                wind_dir: item.wind_dir,
                wind_sc: item.wind_sc,
                wind_spd: item.wind_spd
              })
            })
            that.hourly = result
          }
        })
      },
      // 3-10天预报
      getDaily(params) {
        const that = this
        wx.request({
          url: `${this.globalData.ROOT}/s6/weather/forecast`,
          data: {
            key: this.globalData.KEY,
            location: `${params.longitude},${params.latitude}`
          },
          success(res) {
            let data = res.data.HeWeather6[0]
            if (data.status !== 'ok') {
              // showtoast
              return
            }
            let daily = data.daily_forecast
            let result = []
            daily.map(item => {
              result.push({
                time: item.date.slice(5),
                tmp_min: item.tmp_min,
                tmp_max: item.tmp_max,
                desc_d: item.cond_txt_d,
                desc_n: item.cond_txt_n,
                wind_dir: item.wind_dir,
                wind_sc: item.wind_sc,
                wind_spd: item.wind_spd,
                hum: item.hum,
                pcpn: item.pcpn,
                pop: item.pop,
                uv_index: item.uv_index,
                visible: item.vis
              })
            })
            that.daily = result
          }
        })
      },
      // 生活指数
      getLifeStyle(params) {
        const that = this
        wx.request({
          url: `${this.globalData.ROOT}/s6/weather/lifestyle`,
          data: {
            key: this.globalData.KEY,
            location: `${params.longitude},${params.latitude}`
          },
          success(res) {
            let data = res.data.HeWeather6[0]
            if (data.status !== 'ok') {
              // 请求失败
              return
            }
            // 过滤掉lifeType中没有的类型
            let result = data.lifestyle.filter(item => {
              let flag = false
              that.lifeType.map(temp => {
                if(temp.type === item.type) {
                  item.type_ch = temp.bref
                  flag = true
                }
              })
              return flag
            })
            console.log(result)
            that.lifestyle = result
          }
        })
      }
    },

    created() {
      this.init()
      // let app = getApp()
    }
  }
</script>

<style lang="less" scoped>
  .iconfont {
    font-size: 32px;
  }
  .hourly, .daily {
    h4 {
      padding: 4px 0 4px 10px;
      font-size: 16px;
      border-bottom: 1px solid #2c2c2c;
    }
  }
  .now {
    padding: 10px 30px 60px;
    background-color: cadetblue;
    text-align: center;
    color: #fff;
    h4 {
      text-align: left;
      font-size: 28px;
    }
    .time {
      text-align: left;
      font-size: 16px;
    }
    .tmp {
      position: relative;
      font-size: 76px;
      font-weight: lighter;
      margin: 30px 0 0;
      span:first-child {
        font-size: 40px;
        vertical-align: super;
      }
      span:nth-child(2) {
        position: absolute;
        right: 22%;
        bottom: 18%;
        font-size: 18px;
      }
    }
    .air {
      font-size: 16px;
      position: relative;
      span {
        font-size: 16px;
        padding: 0 10px;
        background-color: rgba(0, 0, 0, .4);
        border-radius: 12px;
      }
    }
  }
  .hourly {
    font-size: 18px;
    color: #fff;
    background-color: orange;
    .wrapper {
      overflow-x: scroll;
      &::-webkit-scrollbar {/*隐藏滚轮*/
        display: none;
      }
      .content {
        width: 1000px;
        .item {
          float: left;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          box-sizing: border-box;
          text-align: center;
          width: 100px;
          height: 100px;
          background-color: rgba(0,0,0,.4);
        }
      }
    }
  }
  .daily {
    font-size: 18px;
    color: #fff;
    background-color: cadetblue;
    .wrapper {
      overflow-x: scroll;
      &::-webkit-scrollbar {/*隐藏滚轮*/
        display: none;
      }
      .content {
        width: 1500px;
        .item {
          position: relative;
          display: flex;
          justify-content: space-around;
          width: 180px;
          height: 90px;
          float: left;
          &::before {
            content: ' ';
            position: absolute;
            top: 18px;
            left: 0;
            width: 1px;
            height: 60px;
            background-color: #fff;
          }
          &:first-child::before {
            content: none;
          }
          .left {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: center;
          }
          .right {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            text-align: center;
          }
          .today {
            font-size: 16px;
            padding: 6px 8px;
            background-color: rgba(0,0,0,.5);
            border-radius: 14px;
          }
        }
      }
    }
  }
  .lifestyle {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 18px;
    color: #fff;
    background-color: #f797ba;
    .item {
      width: 50%;
      padding: 6px 5px;
      box-sizing: border-box;
      border: 1px solid;
      .head {
        position: relative;
        img {
          width: 50px;
          height: 50px;
        }
        .right {
          display: inline-block;
          position: absolute;
          margin-left: 20px;
          text-align: center;
          p {
            font-size: 16px;
            background-color: rgba(0,0,0,.4);
            padding: 0 10px;
            margin-bottom: 5px;
            border-radius: 10px;
          }
        }
      }
      .text {
        font-size: 16px;
        text-indent: 2em;
      }
    }
  }
</style>

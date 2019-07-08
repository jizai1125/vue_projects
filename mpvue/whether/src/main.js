import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = getApp().globalData

app.globalData.ROOT = 'https://free-api.heweather.net'
app.globalData.KEY = 'cd6f831a84ee419abb7f5f026d93943e'


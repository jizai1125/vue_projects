//入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';

import app from './App.vue';
//引入mint ui
// import 'mint-ui/lib/style.css';
import { Header, Tabbar, TabItem } from 'mint-ui';
//导入mui样式
import './lib/mui/css/mui.css';
import './lib/mui/css/iconfont.css';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Header.name, Header);


var vm=new Vue({
    el: '#app',
    data: {
    },
    render: c=>c(app),
    router
})
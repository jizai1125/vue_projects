//入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';
import VueResource from 'vue-resource';
Vue.use(VueResource);

//引入mint ui
// import 'mint-ui/lib/style.css';
import { Header, Tabbar, TabItem, Swipe, SwipeItem } from 'mint-ui';
//导入mui样式
import './lib/mui/css/mui.css';
import './lib/mui/js/mui.js';
import './lib/mui/css/iconfont.css';
//注册组件
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import app from './App.vue';
var vm=new Vue({
    el: '#app',
    data: {
    },

    render: c=>c(app),
    router
});
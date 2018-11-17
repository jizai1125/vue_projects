//入口文件
import Vue from 'vue';
//导入路由的包
import VueRouter from 'vue-router';
//安装路由
Vue.use(VueRouter);
//引入路由文件
import router from './router.js';
//导入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
//设置全局根目录
// Vue.http.options.root='/root';
//按需导入mint-ui组件
import { Header, Tabbar, TabItem, Swipe, SwipeItem } from 'mint-ui';
//注册组件
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//导入mui样式
import './lib/mui/css/mui.css';
// import './lib/mui/js/mui.js';
import './lib/mui/css/iconfont.css';
//导入moment插件，格式化时间
import moment from 'moment';
//定义日期过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return (moment(dataStr).format(pattern))
})

import app from './App.vue';
var vm=new Vue({
    el: '#app',
    data: {
    },

    render: c=>c(app),
    router
});

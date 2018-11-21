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
// import { Header, Tabbar, TabItem, Swipe, SwipeItem, Spinner, Button, Loadmore, Lazyload } from 'mint-ui';
// //注册组件
// Vue.component(Header.name, Header);
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Spinner.name, Spinner);
// Vue.component(Button.name, Button);
// Vue.component(Loadmore.name, Loadmore);
// Vue.use(Lazyload);
//完整导入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
//导入mui样式
import './lib/mui/css/mui.css';
//字体图标
import './lib/mui/css/iconfont.css';
//导入moment插件，格式化时间
import moment from 'moment';
//导入图片预览组件
import VuePictureSwipe from 'vue-picture-swipe';
Vue.component('vue-picture-swipe',VuePictureSwipe);
//定义日期过滤器
Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
    if(!moment(dateStr)._isValid){
        //如果解析错误，直接放回原始字符串
        return dateStr;
    }
    return moment(dateStr).format(pattern);
})

import app from './App.vue';
var vm=new Vue({
    el: '#app',
    data: {
    },

    render: c=>c(app),
    router
});

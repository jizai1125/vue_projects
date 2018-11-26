//入口文件
import Vue from 'vue';
//导入路由的包
import VueRouter from 'vue-router';
//安装路由
Vue.use(VueRouter);
//引入路由文件
import router from './router.js';
//导入，安装vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
//导入,安装vuex
import Vuex from 'vuex';
Vue.use(Vuex);
//进入页面时，先从碧迪存储获取购物车的商品信息
var shopCar=JSON.parse(window.localStorage.getItem('shopCar') || '[]');
var store = new Vuex.Store({
    state: {
        shopCar: shopCar, //存购物车中商品的数据，每一个商品用一个对象保存
        //{id: 商品id, count: 商品数量， price: 商品单价，selected: 商品是否被选中}
    },
    mutations: {
        //添加商品到shopCar
        addToShopCar(state, goods) {
            //如果之前添加获取一样的商品，只需更新数量
            let flag = false; //标志购物车有无此商品，true代表有
            state.shopCar.some(item => {
                if (item.id === goods.id) {
                    item.count += parseInt(goods.count);
                    flag = true;
                    return true;
                }
            })
            if (!flag){
                state.shopCar.push({
                    id: goods.id,
                    count: goods.count,
                    price: goods.price,
                    selected: goods.selected
                })
            }
            // 保存到localStorage
            window.localStorage.setItem('shopCar', JSON.stringify(state.shopCar));
        },
        //更新新shopCar中对应商品的数量count
        updateGoodsCount(state, goods){
            state.shopCar.some(item=>{
                if(item.id===goods.id){
                    item.count=parseInt(goods.count);
                    return true;
                }
            })
            window.localStorage.setItem('shopCar',JSON.stringify(state.shopCar));
        },
        //从shopCar中删除商品
        removeGoods(state,goodsId){
            state.shopCar.some((item,index)=>{
                if(item.id===goodsId){
                    state.shopCar.splice(index,1);
                    return true;
                }
            })
            window.localStorage.setItem('shopCar',JSON.stringify(state.shopCar));
        },
        // 更新shopCar选中状态
        updateGoodsSelected(state,goods){
            state.shopCar.some(item=>{
                if(item.id===goods.id){
                    item.selected=goods.selected;
                    return true;
                }
            })
            // 更新到localStorage
            window.localStorage.setItem('shopCar',JSON.stringify(state.shopCar));
        }
    },
    getters: {
        // 获取购物车中商品总数量
        getCount(state) {
            let count = 0;
            state.shopCar.forEach(item => {
                count += parseInt(item.count);
            })
            return count;
        },
        // 获取选中商品的数量和总价
        getGoodsCountAndAmount(state){
            let goods={
                count: 0,
                amount: 0
            };
            state.shopCar.forEach(item=>{
                if(item.selected){
                    goods.count+=parseInt(item.count);
                    goods.amount+=item.count*item.price;
                }
            })
            return goods;
        }
    }
});
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
    router,
    store,  //挂载store管理状态对象
});

import VueRouter from 'vue-router';
//导入路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
//新闻资讯
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
//图片分享
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
//商品购买
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsCmts from './components/goods/GoodsCmts.vue'

var router=new VueRouter({
    routes: [//配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newsList', component: NewsList},
        {path: '/home/newsInfo/:id', component: NewsInfo},
        {path: '/home/photoList', component: PhotoList},
        {path: '/home/photoInfo/:id', component: PhotoInfo},
        {path: '/home/goodsList', component: GoodsList},
        {path: '/home/goodsInfo/:id', component: GoodsInfo, name: 'goodsInfo'},
        {path: '/home/goodsDesc/:id', component: GoodsDesc, name: 'goodsDesc'},
        {path: '/home/goodsCmts/:id', component: GoodsCmts, name: 'goodsCmts'},
    ],
    linkActiveClass: 'mui-active',  //激活时类名
});
//暴露路由对象
export default router;
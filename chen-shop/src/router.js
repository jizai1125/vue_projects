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
import PhotoShare from './components/photos/PhotoShare.vue'

var router=new VueRouter({
    routes: [//配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newsList', component: NewsList},
        {path: '/home/newsInfo/:id', component: NewsInfo},
        {path: '/home/photoShare', component: PhotoShare},
    ],
    linkActiveClass: 'mui-active',  //激活时类名
});
//暴露路由对象
export default router;
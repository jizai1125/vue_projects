import VueRouter from 'vue-router';
//导入路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
var router=new VueRouter({
    routes: [//配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newsList', component: NewsList},
    ],
    linkActiveClass: 'mui-active',  //激活时类名
});
//暴露路由对象
export default router;
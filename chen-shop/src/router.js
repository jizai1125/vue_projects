import VueRouter from 'vue-router';
//导入路由组件
import HomeContainer from './components/HomeContainer.vue';
import MemberContainer from './components/MemberContainer.vue'
import ShopcarContainer from './components/ShopcarContainer.vue'
import SearchContainer from './components/SearchContainer.vue'

var router=new VueRouter({
    routes: [//配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer }
    ],
    linkActiveClass: 'mui-active',  //激活时类名
});
//暴露路由对象
export default router;
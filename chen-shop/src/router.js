import VueRouter from 'vue-router';
import home from './cms-main/home.vue';
import member from './cms-main/member.vue'
import shopcar from './cms-main/shopcar.vue'
import search from './cms-main/search.vue'

var router=new VueRouter({
    routes: [
        {
            path: '/home',
            component: home
        },
        {
            path: '/member',
            component: member
        },
        {
            path: '/shopcar',
            component: shopcar
        },
        {
            path: '/search',
            component: search
        }

    ]
});
export default router;
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'
import Login from './components/Login' //登陆
import NotFound from './components/NotFound' //404
import CloudDisk from './components/CloudDisk' //主页
import Recommend from "./components/Recommend"; // 推荐

Vue.use(VueRouter)
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/cloud",
      component: CloudDisk,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/recommend",
      component: Recommend,
      redirect: "/recommend/hot",
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: "hot",
          component: () => import("@/components/re-hot.vue"),
        },
        {
          path: "author",
          component: () => import("@/components/re-author.vue"),
        },
        {
          path: "about",
          component: () => import("@/components/re-about.vue"),
        },
      ],
    },
    {
      path: "*",
      component: NotFound,
    },
  ],
});
//路由认证
router.beforeEach((to, from, next) => {
    const token = store.state.token;
    if(to.matched.some( record => record.meta.requireAuth) && !token){
        next({
            path: '/',
            query: {redirect: to.fullPath}
        })
    }else{
        next()
    }
})
export default router
import Vue from "vue";
import Router from "vue-router";
import store from "../store";

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};
import Recommend from "@/components/recommend/recommend";
import Singer from "@/components/singer/singer";
import Search from "@/components/search/search";
import SingerInfo from "@/components/singer-info/singer-info";
import UserCenter from "components/user-center/user-center";
import Login from "components/login/login";
import Setting from "components/setting/setting";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/",
      redirect: "/recommend",
    },
    {
      path: "/recommend",
      component: Recommend,
    },
    {
      path: "/singer",
      component: Singer,
      children: [
        {
          path: ":id",
          component: SingerInfo,
        },
      ],
    },
    {
      path: "/search",
      component: Search,
      children: [
        {
          path: ":id",
          component: SingerInfo,
        },
      ],
    },
    {
      path: "/user",
      component: UserCenter,
    },
    {
      path: "/setting",
      component: Setting,
    },

    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ],
});

// 路由白名单
const whiteList = ["/login"];

// 路由守卫
router.beforeEach(async(to, from, next) => {
  const hasToken = localStorage.getItem("token");
  if (hasToken) {
    if (to.path === "/login") {
      next();
    } else {
      next();
      const hasUserInfo = store.getters.userInfo;
      if (hasUserInfo) {
        next();
      } else {
        // 获取 user info
        try {
          await store.dispatch("getInfo");
        } catch (error) {
          localStorage.removeItem("token");
          next("/login");
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;

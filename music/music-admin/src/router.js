import Vue from "vue";
import Router from "vue-router";
import { LoadingBar } from "view-design";

// 路由
import Login from "@/views/login";
import Home from "@/views/Home";
import NotFound from "@/views/404"; // 404页面
import Index from "@/views/Index";
import musicManage from "@/views/managemusic"; // 歌曲管理
import AdminLikes from "@/views/adminlikes"; // 推荐管理
import styleManage from "@/views/styleManage"; // 风格管理
import userManage from "@/views/userManage"; // 用户管理

Vue.use(Router);

const vueRouter = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/admin" },
    {
      path: "/admin",
      component: Home,
      children: [
        { path: "", redirect: "index" },
        { path: "index", name: "后台", component: Index },
        {
          path: "musicManage",
          name: "musicManage",
          component: musicManage,
          meta: { title: "音乐管理" },
        },
        {
          path: "userManage",
          name: "userManage",
          component: userManage,
          meta: { title: "用户管理" },
        },
        {
          path: "styleManage",
          name: "styleManage",
          component: styleManage,
          meta: { title: "风格管理" },
        },
        {
          path: "music/likes",
          name: "adminlikes",
          component: AdminLikes,
          meta: { title: "推荐歌曲" },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "后台登录",
      },
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound,
      meta: {
        title: "页面找不到",
      },
    },
  ],
});

vueRouter.beforeEach((to, from, next) => {
  LoadingBar.start();
  const adminToken = localStorage.adminToken;
  if (to.path == "/login") {
    if (adminToken) {
      next("/");
    } else {
      next();
    }
  } else {
    // next();
    if (adminToken) {
      next();
    } else {
      next("/login");
    }
  }
});

vueRouter.afterEach((to, next) => {
  LoadingBar.finish();
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "KTV后台管理系统";
  }
});

export default vueRouter;

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from "@/views/Layout";

const routes = [
  {
    name:'layout',
    path: "/",
    component: Layout,
    redirect: '/page1',
    children: [
      {
        name: "page1",
        path: 'page1',
        component: () => import("@/views/page1"),
        meta: { cache: true },
      },
      {
        name: "page2",
        path: 'page2',
        component: () => import("@/views/page2"),
        redirect: '/page2/pageList',
        meta: { cache: true },
        children: [
          {
            name: "pageList",
            path: 'pageList',
            component: () => import("@/views/page2/pageList"),
            meta: { cache: true, activeMenu: 'page2' },
          },
          {
            name: "pageDetail",
            path: 'pageDetail',
            component: () => import("@/views/page2/pageDetail"),
            meta: { activeMenu: 'page2' },
          },
        ],
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes,
});

export default router;

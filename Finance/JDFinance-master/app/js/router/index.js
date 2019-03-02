// 路由文件
import Vue from "vue"
import Router from "vue-router"
import Home from "../home/index.vue"
import "../../css/reset.scss"
import "../../css/index.scss"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        }, {
            path: "/finance",
            name: "finance",
            // component: Home,
        }, {
            path: "/loan",
            name: "loan",
            // component: Home,
        }, {
            path: "/my",
            name: "my",
            // component: Home,
        },
    ],
})

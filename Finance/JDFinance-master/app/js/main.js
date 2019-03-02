import Vue from "vue"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    // render: c => c(App)
    components: { App },
    template: "<App/>",
})
/* eslint-enable no-new */

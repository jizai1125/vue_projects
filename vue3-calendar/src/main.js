import { createApp } from 'vue'
import App from './App.vue'
import calendar from "./plugins/calendar/index.js";

const app = createApp(App)

app.use(calendar)

app.mount('#app')

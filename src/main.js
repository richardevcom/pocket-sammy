import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import axios from "axios"
import "./css/app.scss"
import { InlineSvgPlugin } from "vue-inline-svg"

const base = axios.create({
	baseURL: "http://" + process.env.VUE_APP_SRV_HOST + ":" + process.env.VUE_APP_SRV_PORT,
})

Vue.prototype.$http = base

Vue.config.productionTip = false

Vue.use(InlineSvgPlugin)

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app")
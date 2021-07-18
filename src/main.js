import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast/index'

import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
import {request} from "@/network/request";

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

Vue.use(VueLazyload, {
  preLoad: 1,
  // loading: request('assets/img/common/placeholder.png')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

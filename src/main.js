import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import AV from 'leancloud-storage'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSession from 'vue-session'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor  from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.use(VueSession)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.prototype.$av=AV

AV.init({
  appId: "3l8A8UM94j58x0Q26vmaSVGC-gzGzoHsz",
  appKey: "hvlzfDtax0Qv58DerbQBsOh8",
  serverURL: "https://3l8a8um9.lc-cn-n1-shared.com"
})


Vue.config.productionTip = false

// 创建一个 Axios 实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:10086',
});

// 将 Axios 实例添加到 Vue 的原型链上
Vue.prototype.$axios = instance;

// 在axios的响应拦截器中进行跳转判断
instance.interceptors.response.use(
    response => {
      const data = response.data;

      // 根据数据包中的字段进行跳转判断
      if (data.code === "2001") {
        localStorage.clear()
        this.$router.push({
          path:"/login",
        }) // 执行跳转
        alert(response.data.msg)
      }
      return response;
    },
    error => {
      return Promise.reject(error);
    }
);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

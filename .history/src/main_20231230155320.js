import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AV from 'leancloud-storage'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSession from 'vue-session'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { mavonEditor } from 'mavon-editor'
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


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

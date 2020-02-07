import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/font/iconfont.css'
import Axios from 'axios'
import md5 from 'md5'

Vue.prototype.$http = Axios
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

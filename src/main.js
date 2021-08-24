import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/iconfont.css'
import axios from 'axios'
import * as echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'

Vue.prototype.$http=axios
axios.defaults.baseURL="http://localhost:9090"
axios.interceptors.request.use(config => {
  let token = window.localStorage.getItem("TOKEN");
  if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
  }
  return config
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts=echarts
Vue.use(BaiduMap,{
  ak:'6DU7XmpQ7QdE3dbdGnTzfleRfTrxu1G3'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


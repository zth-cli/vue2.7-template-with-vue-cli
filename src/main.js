import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Loading } from 'element-ui'
import './plugins/day.js'
import './plugins/particles.js'
import '@/assets/scss/base.scss'
import plugin from '@/utils/install' // 全局组件
import echarts from 'echarts'
// 防抖节流全局指令
import Directives from './directive/index.js'
Vue.use(Directives)
Vue.use(Loading.directive);
Vue.use(plugin)

Vue.prototype.echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

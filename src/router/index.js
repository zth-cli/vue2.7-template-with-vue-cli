import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout/index.vue'
import getRoutes from './getRoutes'
import routeArr from '@/mock/router.js'

const sonRoute = getRoutes(routeArr)
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [...sonRoute]
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      title: '重载',
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect/index.vue'),
        meta: {
          title: '重载',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  }
]
Vue.use(VueRouter)
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  Nprogress.start()
  // to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  // 如果即将进入登录路由，则直接放行
  // 进入的不是登录路由
  if (to.path === '/login') {
    next()
  } else {
    if (!getToken('token')) {
      Message({
        message: '权限已失效，请重新登录！',
        type: 'error',
        duration: 1500
      })
      next({
        path: '/login'
      })
    } else {
      // 下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
      if (to.meta.title) document.title = to.meta.title
      next()
    }
  } // 如果不需要登录验证，或者已经登录成功，则直接放行
})
router.afterEach(() => {
  Nprogress.done()
})
export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import Main from '@/components/Layout.vue'
import routeArr from '@/mock/router.js'
var addRoutes = []

function addRouter (routeArr) {
  routeArr.forEach(item => {
    if (item.type === 1 && item.children.length > 0) {
      addRouter(item.children)
    } else if (item.type !== 1) {
      addRoutes.push({
        path: item.path,
        name: item.componentName,
        // component: (resolve) => require([`@/views/${item.componentPath}.vue`], resolve),
        component: () => import(/* webpackChunkName: "[request]" */ `@/views/${item.componentPath}.vue`),
        meta: {
          title: item.title,
          isCache: false,
          requiresAuth: true
        }
      })
    }
  })
}
addRouter(routeArr)
const routes = [{
  path: '/',
  name: 'Main',
  component: Main,
  redirect: '/home',
  children: [...addRoutes]
},
{
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
}
]
Vue.use(VueRouter)
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
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

export default router

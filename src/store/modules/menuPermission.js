import { getSystemFuncList } from '@/api' // 菜单接口
import router from '@/router'
import getRoutes from '@/router/getRoutes'

const permission = {
  state: {
    routes: JSON.parse(localStorage.getItem('menu')) || []
  },
  mutations: {
    SET_USERMENU: (state, menu) => {
      state.routes = menu
      // localStorage.setItem('menu', JSON.stringify(menu))
    }
  },
  actions: {
    GetUserMenu ({ commit }) {
      return new Promise((resolve, reject) => {
        let asyncRoutes = []
        router.options.routes[1].children = []
        getSystemFuncList().then(res => {
          asyncRoutes = [].concat(res.data.systemFunctionTreeNodes[0].children)
          const routes = getRoutes(asyncRoutes)
          routes.push({
            component: () => import('@/components/notFound.vue'),
            meta: { title: '404', isCache: false, requiresAuth: true },
            name: '404',
            path: '/404'
          })
          router.options.routes[1].children = [].concat(routes)
          router.options.routes.push({
            path: '*',
            redirect: '/404'
          })
          router.addRoutes(router.options.routes)
          commit('SET_USERMENU', asyncRoutes)
          resolve(routes)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default permission

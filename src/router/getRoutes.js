const addRoutes = []
function addRouter(routeArr = []) {
  if (routeArr.length < 1) {
    return
  }
  routeArr.forEach((item) => {
    if (item.type === 1 && item.children && item.children.length > 0) {
      addRouter(item.children)
    } else if (item.type !== 1) {
      addRoutes.push({
        path: item.path,
        name: item.componentName,
        // component: (resolve) => require([`@/views/${item.componentPath}.vue`], resolve),
        // component: () => import(/* webpackChunkName: "[request]" */ `@/views/${item.componentPath}.vue`),
        component: () => lazyLoad(import(/* webpackChunkName: "[request]" */ `@/views/${item.componentPath}.vue`)),
        meta: {
          title: item.title,
          isCache: false,
          requiresAuth: true,
        },
      })
    }
  })
  return addRoutes
}
// 处理加载状态
function lazyLoad(component) {
  const AsyncHandler = () => ({
    component,
    loading: require('@/components/notFound.vue').default,
    error: require('@/components/error.vue').default,
    delay: 200,
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      return h(AsyncHandler, data, children)
    },
  })
}
export default addRouter

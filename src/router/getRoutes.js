/*
 * @Author: 阮志雄
 * @Date: 2021-04-16 14:52:21
 * @LastEditTime: 2021-05-24 10:23:08
 * @LastEditors: rzx007
 * @Description: 处理菜单数据，返回标准的Vue-Route对象
 * @FilePath: \vue-template-with-elementui\src\router\getRoutes.js
 */
var addRoutes = []
function addRouter (routeArr = []) {
  if (routeArr.length < 1) { return }
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
  return addRoutes
}
export default addRouter

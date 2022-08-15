/*
 * @Author: 阮志雄
 * @Date: 2022-05-06 11:12:43
 * @LastEditTime: 2022-08-10 16:49:37
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue-template-with-elementui\src\mock\router.js
 */
const routeArr = [
  {
    title: '首页',
    componentName: 'Home',
    componentPath: 'Home/index',
    icon: 'el-icon-house',
    parentId: 0,
    id: '0515',
    type: 3,
    path: '/home',
  },

  {
    title: '列表页面',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '0514',
    type: 1,
    children: [
      {
        title: 'CURD布局',
        componentName: 'curd',
        componentPath: 'curd/index',
        icon: 'el-icon-coffee-cup',
        parentId: 0,
        id: '05141',
        type: 3,
        path: '/curd',
      },
      {
        title: '基础列表',
        componentName: 'curd',
        componentPath: 'curd/pages/curd-view',
        icon: 'el-icon-coffee-cup',
        parentId: 0,
        id: '05142',
        type: 3,
        path: '/curd-view',
      },
    ],
  },
  {
    title: '组件错误',
    componentName: 'sdd',
    componentPath: 'curd/pages/sdd',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '05143',
    type: 3,
    path: '/sdd',
  },
]
export default routeArr

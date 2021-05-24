const routeArr = [
  {
    title: '首页',
    componentName: 'Home',
    componentPath: 'Home/index',
    icon: 'el-icon-house',
    parentId: 0,
    id: '0515',
    type: 3,
    path: '/home'
  },
  {
    title: '例子',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '0514',
    type: 1,
    children: [{
      title: 'CURD布局',
      componentName: 'curd',
      componentPath: 'curd/index',
      icon: 'el-icon-coffee-cup',
      parentId: 0,
      id: '05141',
      type: 3,
      path: '/curd'
    }]
  },
  {
    title: 'CURD布局1',
    componentName: 'curd',
    componentPath: 'curd/pages/curd-view',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '05142',
    type: 3,
    path: '/curds'
  },
  {
    title: '组件错误',
    componentName: 'sdd',
    componentPath: 'curd/pages/sdd',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '05143',
    type: 3,
    path: '/sdd'
  }
]
export default routeArr

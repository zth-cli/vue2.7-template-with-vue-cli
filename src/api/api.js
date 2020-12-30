import http from './http'

export async function login (params) {
  const res = await http.get('systemService/user/login', { params })
  return res
}

//  用采 oms 关联
export async function relationAsset (params) {
  const res = await http.post('/systemService/archive/relationAsset', params)
  return res
}
//  用采 oms 取消关联
export async function unRelationAsset (params) {
  const res = await http.post('/systemService/archive/unRelationAsset', params)
  return res
}
//  获取电表
export async function getMeterTree (params) {
  const res = await http.get('/systemService/archive/getMeterTree', { params })
  return res
}
//  添加手动上送
export async function addRetask (params) {
  const res = await http.post('/systemService/retask/addReTask', params)
  return res
}

//  用户管理start
//  新增用户
export async function addUser (params) {
  const res = await http.post('/systemService/user/addUser', params)
  return res
}
//  修改用户信息
export async function updateUserById (params) {
  const res = await http.post('/systemService/user/updateUserById', params)
  return res
}
//  修改用户状态
export async function updateUserStatus (params) {
  const res = await http.post('/systemService/user/stopUser', params)
  return res
}
// 用户管理end

//  角色管理start
//  查询所有角色
export async function getRoleList (params) {
  const res = await http.get('/systemService/role/list', { params })
  return res
}
//  新增角色
export async function addRole (params) {
  const res = await http.post('/systemService/role/add', params)
  return res
}
//  修改角色信息
export async function updateRole (params) {
  const res = await http.post('/systemService/role/update', params)
  return res
}
//  删除角色
export async function deleteRole (params) {
  const res = await http.post('/systemService/role/del', params)
  return res
}
//  获取用户已分配的角色
export async function getUserRole (params) {
  const res = await http.get('/systemService/user/get/UserRoleId', { params })
  return res
}
//  获取角色拥有菜单
export async function getRoleOwnMenu (params) {
  const res = await http.get('/systemService/role/own/menu', { params })
  return res
}
//  为角色授予菜单
export async function roleGrantMenu (params) {
  const res = await http.post('/systemService/role/grant/menu', params)
  return res
}
//  角色管理end

//  菜单管理start
//  获取当前用户拥有的菜单
export async function getMenuMain (params) {
  const res = await http.get('/systemService/menu/main', { params })
  return res
}
//  获取菜单树
export async function getMenuTree (params) {
  const res = await http.get('/systemService/menu/tree', { params })
  return res
}
//  使用menuId获取菜单信息
export async function getMenuInfo (params) {
  const res = await http.get('/systemService/menu/get', { params })
  return res
}
// 新增菜单
export async function addSystemMenu (params) {
  const res = await http.post('/systemService/menu/add', params)
  return res
}
// 修改菜单
export async function updateSystemMenu (params) {
  const res = await http.post('/systemService/menu/update', params)
  return res
}
// 删除菜单
export async function deleteMenuNode (params) {
  const res = await http.post('/systemService/menu/del', params)
  return res
}
//  修改密码
export async function updatePassword (params) {
  const res = await http.post('/systemService/user/updataPassword', params)
  return res
}
// 菜单管理end

// 首页start
//  首页数量
export async function getOrgAssetCount (params) {
  const res = await http.get('/dataservice/query/v1/getOrgAssetCount', { params })
  return res
}
//  柱状图
export async function getFileMonitor (params) {
  const res = await http.get('/systemService/archive/fileMonitor', { params })
  return res
}
// 首页end

// 不定参数请求
// get
export async function apiGet (url, params) {
  const res = await http.get(url, {
    params
  })
  return res
}
// post
export async function apiPost (url, params) {
  const res = await http.post(url, params)
  return res
}

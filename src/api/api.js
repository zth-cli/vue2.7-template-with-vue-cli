import { http } from '@/http'

export async function login(params) {
  const res = await http.get('systemService/user/login', params)
  return res
}

//  用采 oms 关联
export async function relationAsset(params) {
  const res = await http.post('/systemService/archive/relationAsset', params)
  return res
}
// 获取用户菜单
export async function getSystemFuncList(params) {
  const res = await http.get('/systemManagementService/userService/getSystemFuncList', params)
  return res
}

export async function componentsList(params) {
  const res = await http.get('/get/componentsList', params)
  return res
}
export async function addComponentsList(params) {
  const res = await http.post('/post/componentsList', params)
  return res
}
// 不定参数请求
// get
export async function apiGet(url, params) {
  const res = await http.get(url, {
    params,
  })
  return res
}
// post
export async function apiPost(url, params, config) {
  const res = await http.post(url, params, config)
  return res
}
// upload
export async function apiUpload(url, params) {
  const res = await http.post(url, params)
  return res
}

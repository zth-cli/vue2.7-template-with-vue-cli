/*
 * @Author: 阮志雄
 * @Date: 2021-07-08 14:29:08
 * @LastEditTime: 2021-07-31 00:29:26
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue-template-with-elementui\src\api\api.js
 */
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
// 获取用户菜单
export async function getSystemFuncList (params) {
  const res = await http.get('/systemManagementService/userService/getSystemFuncList', { params })
  return res
}

export async function componentsList (params) {
  const res = await http.get('/get/componentsList', { params })
  return res
}
export async function addComponentsList (params) {
  const res = await http.post('/post/componentsList', params)
  return res
}
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

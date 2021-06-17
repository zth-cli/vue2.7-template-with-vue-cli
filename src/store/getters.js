/*
 * @Author: rzx007
 * @Date: 2021-05-24 10:12:09
 * @LastEditors: rzx007
 * @LastEditTime: 2021-06-17 10:48:56
 * @FilePath: \vue-template-with-elementui\src\store\getters.js
 * @Description: Do not edit
 */
const getters = {
  fixedHeader: state => state.settings.fixedHeader,
  mode: state => state.settings.menuModeisVertical, // 水平菜单,垂直菜单
  sidebarLogo: state => state.settings.menuModeisVertical,
  tagsBar: state => state.settings.tagsBar,
  showThemeBar: state => state.settings.showThemeBar,
  // 菜单权限
  routes: state => state.menuPermission.routes
}
export default getters

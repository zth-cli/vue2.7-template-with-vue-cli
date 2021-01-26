const getters = {
  fixedHeader: state => state.settings.fixedHeader,
  mode: state => state.settings.menuModeisVertical, // 水平菜单,垂直菜单
  sidebarLogo: state => state.settings.menuModeisVertical,
  tagsBar: state => state.settings.tagsBar,
  showThemeBar: state => state.settings.showThemeBar
}
export default getters

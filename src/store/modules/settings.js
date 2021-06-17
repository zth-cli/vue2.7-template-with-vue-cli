/*
 * @Author: rzx007
 * @Date: 2021-05-24 10:12:09
 * @LastEditors: rzx007
 * @LastEditTime: 2021-06-17 10:48:45
 * @FilePath: \vue-template-with-elementui\src\store\modules\settings.js
 * @Description: Do not edit
 */
/* eslint-disable no-prototype-builtins */
import themeSet from '@/settings'

function checkStorange (key) {
  return localStorage.getItem(key) != null ? (localStorage.getItem(key) == 'true') : themeSet[key]
}
const state = {
  fixedHeader: checkStorange('fixedHeader'),
  // sidebarLogo: checkStorange('sidebarLogo'),
  menuModeisVertical: checkStorange('menuModeisVertical'),
  tagsBar: checkStorange('tagsBar'),
  showThemeBar: checkStorange('showThemeBar')
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      localStorage.setItem(key, value)
    }
  }
}

const actions = {
  // eslint-disable-next-line no-unused-vars
  changeSetting ({ commit, state, getters }, data) {
    console.log(data)
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

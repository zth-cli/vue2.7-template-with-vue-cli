/* eslint-disable no-prototype-builtins */
import themeSet from '@/settings'

function checkStorange(key) {
    return localStorage.getItem(key) != null ? (localStorage.getItem(key) == "true" ? true : false) : themeSet[key]
}
const state = {
    fixedHeader: checkStorange('fixedHeader'),
    // sidebarLogo: checkStorange('sidebarLogo'),
    menuModeisVertical: checkStorange('menuModeisVertical'),
    tagsBar: checkStorange('tagsBar'),
    showThemeBar:checkStorange('showThemeBar'),
}

const mutations = {
    CHANGE_SETTING: (state, { key,value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
            localStorage.setItem(key, value)
        }
    }
}

const actions = {
    // eslint-disable-next-line no-unused-vars
    changeSetting({ commit,state ,getters }, data) {
        console.log(data);
        commit('CHANGE_SETTING', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
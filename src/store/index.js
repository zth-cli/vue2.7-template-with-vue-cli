import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import settings from './modules/settings'
import menuPermission from './modules/menuPermission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings,
    menuPermission
  },
  getters
})

export default store

import debounce from './debounce'
import throttle from './throttle'
import copy from './copy'
import dialogDrag from './dialogdrag'
const directives = { debounce, throttle, copy, dialogDrag }
export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
  }
}

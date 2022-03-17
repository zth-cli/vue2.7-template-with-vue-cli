// import foot from '@/components/footer.vue';
import svgIcon from '@/components/SvgIcon'
// import sideTree from '@/components/Side-tree.vue';
import overlay from '@/components/Overlay'
import CurdView from '@/components/CurdViews/index'
const components = { svgIcon, overlay, CurdView }

function plugin (Vue) {
  if (plugin.installed) {
    return
  }
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
export default plugin

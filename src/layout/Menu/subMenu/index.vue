<script>
import { Submenu as ElSubmenu, MenuItem, Menu as ElMenu } from 'element-ui'
export default {
  name: 'ZthMenu',
  components: { ElSubmenu, MenuItem, ElMenu },
  data() {
    return {}
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    menuConfig: {
      type: Object,
    },
  },
  methods: {
    renderFunc(h, data) {
      const { menuConfig, renderFunc } = this
      return data.map((item) => {
        if (item.children && item.children.length > 0) {
          return (
            <ElSubmenu index={item.title}>
              <template slot='title'>
                <i class={[item.icon, 'icons']} style={{ color: menuConfig.textColor }}></i>
                {item.title}
              </template>
              {renderFunc(h, item.children)}
            </ElSubmenu>
          )
          // return h(
          //   'el-submenu',
          //   {
          //     scopedSlots: {
          //       title: () =>
          //         h('div', [
          //           h('i', {
          //             class: ['icons', item.icon],
          //             style: { color: this.menuConfig.textColor },
          //           }),
          //           h('span', item.title),
          //         ]),
          //     },
          //     props: {
          //       index: item.title,
          //     },
          //   },
          //   [...that.renderFunc(h, item.children)]
          // )
        }
        return (
          <MenuItem index={item.path ? item.path : ''}>
            <i class={[item.icon, 'icons']} style={{ color: menuConfig.textColor }}></i>
            {item.title}
          </MenuItem>
        )
        // return h('MenuItem', {
        //   props: {
        //     index: item.path,
        //   },
        //   scopedSlots: {
        //     default: () =>
        //       h('i', {
        //         class: ['icons', item.icon],
        //         style: {
        //           color: this.menuConfig.textColor,
        //         },
        //       }),
        //     title: () => h('span', item.title),
        //   },
        // })
      })
    },
  },
  render(h) {
    const { data } = this
    return h(
      ElMenu,
      {
        class: 'sidebar-el-menu',
        props: { ...this.$attrs, router: true },
      },
      this.renderFunc(h, data)
    )
  },
}
</script>
<style lang="scss"></style>

<template>
  <div
    class="horizontal-menu-main"
    :class="[mode ? 'vertical-menu-main' : 'horizontal-menu', isCollapse ? 'isCollapse' : '']"
  >
    <div class="slide-logo" v-if="mode">
      <img src="@/assets/img/logo.png" />
    </div>
    <SubMenu
      :default-active="onRoutes"
      :text-color="menuConfig.textColor"
      :active-text-color="menuConfig.activeTextColor"
      unique-opened
      :collapse="isCollapse"
      :router="true"
      :mode="mode ? 'vertical' : 'horizontal'"
      :data="menuData"
      :menuConfig="menuConfig"
    ></SubMenu>
  </div>
</template>
<script>
import bus from '@/utils/bus'
import { menuColorObj } from '@/assets/scss/_variables'
import routeArr from '@/mock/router.js'
import SubMenu from './subMenu/index.vue'
export default {
  name: 'ZthMenu',
  components: { SubMenu },
  data() {
    return {
      menuConfig: {
        textColor: '',
        activeTextColor: '',
        backgroundColor: '',
      },
      isCollapse: false,
      menuData: [...routeArr],
    }
  },
  props: {
    mode: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '')
    },
  },
  methods: {
    changeMebuColor() {
      const themeStr = document.documentElement.getAttribute('data-theme')
      this.menuConfig = menuColorObj[themeStr]
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', () => {
      // this.collapse = msg;
    })
    this.changeMebuColor()
  },
  mounted() {
    const that = this
    setTimeout(function () {
      that.collapse = true
    }, 500)
    // eslint-disable-next-line no-unused-vars
    bus.$on('changMenuColor', (theme) => {
      this.changeMebuColor()
    })
    bus.$on('handleCollapse', (bool) => {
      this.isCollapse = bool
    })
  },
}
</script>

<style lang="scss">
.el-menu {
  @include header-background();
  border-right: none;
}
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  @include header-background();
}
.el-menu-item:focus,
.el-menu-item:hover {
  @include header-active-background();
}
.horizontal-menu-main {
  @include header-background();
  height: 100%;
  width: auto;
  .icons {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
    // color: rgb(214, 106, 87);
  }
  .el-menu .el-submenu__title .el-submenu__icon-arrow {
    @include font_color(#fff);
  }

  .el-menu .el-submenu__title:hover {
    @include header-active-background();
  }
  .el-menu .el-menu-item:hover {
    @include header-active-background();
  }
  .el-menu .el-menu-item.is-active {
    @include header-active-background();
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title,
  .el-menu--horizontal > .el-menu-item {
    padding: 0 12px !important;
    font-size: 12px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }
}
.vertical-menu-main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 200px;
  transition: width 0.2s ease-in;
  .sidebar-el-menu {
    flex: 1;
  }
}
.slide-logo {
  margin-left: 10px;
  margin-top: 12px;
}
.isCollapse {
  width: 64px;
  overflow: hidden;
}
</style>

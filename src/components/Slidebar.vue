<template>
  <div
     class="horizontal-menu-main"
    :class="[mode ? 'vertical-menu-main' : 'horizontal-menu',isCollapse?'isCollapse':'']"
  >
   <div class="slide-logo" v-if="mode">
      <img src="@/assets/img/logo.png" />
    </div>
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :text-color="menuConfig.textColor"
      :active-text-color="menuConfig.activeTextColor"
      :background-color="menuConfig.backgroundColor"
      unique-opened
      :collapse="isCollapse"
      router
      :mode="mode?'vertical':'horizontal'"
    >
      <template v-for="item in menuData">
        <template v-if="item.children">
          <el-submenu :index="item.title" :key="item.index">
            <template slot="title">
              <i
                class="icons"
                :class="item.icon"
                :style="{ color: menuConfig.textColor }"
              ></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(subItem, i) in item.children"
              :key="i"
              :index="subItem.path"
              >{{ subItem.title }}</el-menu-item
            >
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.index">
            <i
              class="icons"
              :class="item.icon"
              :style="{ color: menuConfig.textColor }"
            ></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import bus from '@/utils/bus'
import { menuColorObj } from '@/assets/scss/_variables'
import routeArr from '@/mock/router.js'
export default {
  data () {
    return {
      menuConfig: {
        textColor: '',
        activeTextColor: '',
        backgroundColor: ''
      },
      isCollapse: false,
      menuData: [...routeArr]
    }
  },
  props: {
    mode: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    changeMebuColor () {
      var themeStr = document.documentElement.getAttribute('data-theme')
      this.menuConfig = menuColorObj[themeStr]
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', (msg) => {
      // this.collapse = msg;
    })
    this.changeMebuColor()
  },
  mounted () {
    var that = this
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
  }
}
</script>

<style lang='scss'>
.horizontal-menu-main {
  @include header-background();
  height: 100%;
  width: auto;
  overflow-y: auto;
  .el-menu {
    @include header-background();
    border-right: none;
  }
  .icons {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
    // color: rgb(214, 106, 87);
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title,
  .el-menu--horizontal > .el-menu-item {
    height: 50px !important;
    line-height: 50px !important;
    padding: 0 12px !important;
    font-size: 12px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }
}
.vertical-menu-main {
  width: 200px;
}
.slide-logo{
  margin-left: 10px;
  margin-top: 12px;
}
.isCollapse{
  width: 64px; overflow: hidden;
}
</style>

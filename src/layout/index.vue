<template>
  <div class="layout">
    <v-slidebar v-if="mode" :mode="mode"></v-slidebar>
    <div class="right_container">
      <el-header>
        <v-header :mode="mode">
          <v-slidebar v-if="!mode" :mode="mode"></v-slidebar>
        </v-header>
      </el-header>
      <div class="dashborad">
        <div class="tag-nav-wrapper">
          <v-tags v-if="tagsBar && $route.path != '/home'"></v-tags>
        </div>
        <div class="content-wrapper-layout">
          <v-bread v-if="$route.path != '/home'"></v-bread>
          <v-main></v-main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import vSlidebar from './Menu'
import vTags from './TagsView'
import vHeader from './Header'
import vMain from './Mian'
import vBread from './Breadcrumb'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  data() {
    return {
      isMini: false,
      tagsList: []
    }
  },

  components: { vTags, vHeader, vSlidebar, vMain, vBread },
  computed: { ...mapGetters(['mode', 'showThemeBar', 'tagsBar']) }, // mode为true时，侧边栏菜单
  methods: {},
  created() {
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      console.log(msg)
      const arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
    // 出发mini菜单
    bus.$on('showMini', bol => {
      this.isMini = !bol
    })
  },
  mounted() {
    console.log(this.tagsBar)
    bus.$on('showMini', bol => {
      this.isMini = !bol
    })
  }
}
</script>
<style lang="scss">
.layout {
  height: 100vh;
  overflow: hidden;
  display: flex;
}
.right_container {
  flex: 1;
  overflow-x: hidden;
  .dashborad {
    height: calc(100vh - 50px);
    width: 100%;
    // overflow: auto;
    position: relative;
    .tag-nav-wrapper {
      z-index: 10;
      width: 100%;
      // position: absolute;
      // bottom: 0;
      // left: 0;
    }
    .mini_tag_nav {
      margin-left: 50px;
      width: calc(100% - 51px);
    }
  }
}

.el-header {
  // background: #272451;
  color: #333;
  // text-align: center;
  height: 50px !important;
  box-sizing: border-box;
  padding: 0;
  // line-height: 60px;
}
.el-layout {
  @include base-background();
  @include font-color(#666);
  padding: 0 !important;
}
.content-wrapper-layout {
  height: calc(100% - 36px);
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  // padding: 0 18px;
  .content-main {
    box-sizing: border-box;
    padding: 0 18px;
    flex: 1;
    overflow: auto;
    height: calc(100% - 40px);
  }
}
.full-content-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>

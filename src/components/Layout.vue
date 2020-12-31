<template>
  <div class="layout">
    <v-slidebar v-if="mode" :mode='mode'></v-slidebar>
    <div class="right_container">
      <el-header>
        <v-header :mode='mode' :showThemeBar='showThemeBar'>
           <v-slidebar v-if="!mode" :mode='mode'></v-slidebar>
        </v-header>
      </el-header>
      <div class="dashborad">
        <div class="content-wrapper-layout">
          <template>
            <keep-alive v-if="isShow">
              <router-view v-if="$route.meta.isCache"></router-view>
            </keep-alive>
          </template>
          <template v-if="isShow">
            <router-view v-if="!$route.meta.isCache"></router-view>
          </template>
        </div>
        <div class="tag-nav-wrapper">
          <v-tags></v-tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import vSlidebar from '@/components/Slidebar.vue'
import vTags from '@/components/Tags.vue'
import vHeader from '@/components/Header.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  data () {
    return {
      isMini: false,
      tagsList: [],
      isShow: true // 控制router-view的隐藏与展示,达到刷新效果
    }
  },
  // 提供可注入子组件属性
  provide () { return { reload: this.reload } },
  components: { vTags, vHeader, vSlidebar },
  computed: { ...mapGetters(['mode', 'showThemeBar']) }, // mode为true时，侧边栏菜单
  methods: {
    reload () {
      this.isShow = false
      // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        this.isShow = true
      })
    }
  },
  created () {
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
  mounted () {
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
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .mini_tag_nav {
      margin-left: 50px;
      width: calc(100% - 51px);
    }
  }
}

.el-header {
  @include header-background();
  // background: #272451;
  color: #333;
  // text-align: center;
  height: 50px !important;
  box-sizing: border-box;
  // line-height: 60px;
}
.el-layout {
  @include base-background();
  @include font_color(#666);
  padding: 0 !important;
}
.content-wrapper-layout {
  height: calc(100% - 32px);
  overflow: auto;
  overflow-x: hidden;
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

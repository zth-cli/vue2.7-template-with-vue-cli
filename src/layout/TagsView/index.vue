<template>
  <div class="tags" v-if="showTags">
    <el-tabs
      :closable="!(tagsList.length == 1)"
      @tab-click="changeTab"
      @tab-remove="closeTags"
      type="card"
      v-model="activeValue"
    >
      <el-tab-pane
        :key="item.path"
        :label="item.title"
        :name="item.title"
        :tab="item"
        v-for="item in tagsList"
      ></el-tab-pane>
    </el-tabs>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <!-- <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button> -->
        <i class="el-icon-menu drop-icon"></i>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus'
export default {
  data() {
    return {
      tagsList: [],
      activeValue: ''
    }
  },
  methods: {
    changeTab(component) {
      const tab = component.$attrs.tab
      this.$router.push(tab.path)
    },
    // 关闭单个标签
    closeTags(tabName) {
      const index = this.tagsList.findIndex((item) => item.title == tabName)
      const delItem = this.tagsList.splice(index, 1)[0]
      // 剩余的tags
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
      if (item) {
        // 更改路由，watch监听，调用setTags,触发自定义事件tags
        delItem.fullPath === this.$route.fullPath && this.$router.push(item.fullPath)
      } else {
        this.$router.push('/')
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = []
      this.$router.push('/') // 路由变更
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter((item) => {
        return item.fullPath === this.$route.fullPath // 路由变更
      })
      this.tagsList = curItem
    },
    // 设置标签route
    setTags(route) {
      const routeObj = {
        title: route.meta.title,
        fullPath: route.fullPath,
        name: route.matched[1].components.default.name,
        path: route.path,
        meta: route.meta
      }
      const existIndex = this.tagsList.findIndex((item) => {
        return item.path === route.path
      })
      if (existIndex > -1) {
        this.tagsList.splice(existIndex, 1, routeObj)
      } else {
        this.tagsList.push(routeObj)
      }
      this.activeValue = route.meta.title
      bus.$emit('tags', this.tagsList)
    },
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route(newValue) {
      this.setTags(newValue)
    }
  },
  created() {
    this.setTags(this.$route)
  }
}
/*
逻辑：
1.监听路有变化，添加到tagsList
2.关闭选项，

 */
</script>

<style lang="scss">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  padding: 0 10px;
  @include base-background();
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 19px 8px 10px;
  // @include box-shadow();
  .el-tabs--top.el-tabs--card > .el-tabs__header {
    border: none;
  }
  .el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:nth-child(2) {
    padding-left: 5px;
  }
  .el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
    padding-right: 5px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
    padding-left: 5px;
    padding-right: 5px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs__header {
    border: none;
    margin: 0;
    .el-tabs__item {
      margin: 3px 5px 3px 3px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 32px;
      padding: 6px 12px 4px !important;
      @include content-background();
      vertical-align: middle;

      transition: all 0.3s ease-in;
      line-height: 22px;
      text-align: center;
      border: none !important;
      .el-icon-close:hover {
        background: transparent;
      }
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 32px;
    }
    // .el-tabs__item.is-active {
    //   @include font-color(#fff);
    //   @include tool-bar-color();
    // }
    .el-tabs__nav {
      border: none;
    }
  }
  .tags-close-box {
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;

    line-height: 30px;
    // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
    cursor: pointer;
    .drop-icon {
      font-size: 18px;
      font-weight: bolder;
      transition: all 0.2s ease-in-out;
      &:hover {
        @include sec-font-color();
        // transform: rotate(90deg);
      }
    }
  }
}
</style>


<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link :to="item.fullPath" class="tags-li-title" :title="item.title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
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
  data () {
    return {
      tagsList: []
    }
  },
  methods: {
    isActive (path) {
      return path === this.$route.path
    },
    // 关闭单个标签
    closeTags (index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      // 剩余的tags
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1]
      if (item) {
        // 更改路由，watch监听，调用setTags,触发自定义事件tags
        delItem.fullPath === this.$route.fullPath &&
          this.$router.push(item.fullPath)
      } else {
        this.$router.push('/')
      }
    },
    // 关闭全部标签
    closeAll () {
      this.tagsList = []
      this.$router.push('/') // 路由变更
    },
    // 关闭其他标签
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.fullPath === this.$route.fullPath // 路由变更
      })
      this.tagsList = curItem
    },
    // 设置标签route
    setTags (route) {
      const routeObj = {
        title: route.meta.title,
        fullPath: route.fullPath,
        name: route.matched[1].components.default.name,
        path: route.path,
        meta: route.meta
      }
      const existIndex = this.tagsList.findIndex(item => {
        return item.path === route.path
      })
      if (existIndex > -1) {
        this.tagsList.splice(existIndex, 1, routeObj)
      } else {
        this.tagsList.push(routeObj)
      }

      bus.$emit('tags', this.tagsList)
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  },
  computed: {
    showTags () {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route (newValue) {
      this.setTags(newValue)
    }
  },
  created () {
    this.setTags(this.$route)
  }
}
/*
逻辑：
1.监听路有变化，添加到tagsList
2.关闭选项，

 */
</script>

<style lang='scss'>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  @include content-background();
  padding-right: 120px;
  @include box-shadow();
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid transparent;
  @include border-color();
   @include tool-bar-color();
  padding: 0 5px 0 12px;
  vertical-align: middle;
  @include font_color(#fff);
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #f8f8f8;
}

.tags-li.active {
  @include font_color(#fff);
}
.tags-li.active {
  background: rgb(209, 204, 204);

}
.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  @include font_color(#fff);
}

.tags-li.active .tags-li-title {
  @include font_color(#fff);
}
.tags-li.active .tags-li-icon i {
  color: #fff !important;
}
.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>

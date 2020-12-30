<template>
  <div class="nav_bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item> -->
      <el-breadcrumb-item>{{currentPathName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPathName: this.$route.meta.title
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route (newValue, oldValue) {
      // console.log(oldValue);
      this.currentPathName = newValue.meta.title
    }
  }
}
</script>
<style lang='scss'>
.nav_bread {
  height: 40px;
  width: 100%;
  position: relative;
  line-height: 40px;
  display: flex;
  align-items: center;
}
.nav_bread::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #e4e7ed;
  z-index: 1;
}
</style>

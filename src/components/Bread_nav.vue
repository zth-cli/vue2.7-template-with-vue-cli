<template>
  <div class="nav_bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
      <i class="el-icon-house"></i>
      首页</el-breadcrumb-item>
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
  margin-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  @include border-color();
  padding: 0 18px;
}

</style>

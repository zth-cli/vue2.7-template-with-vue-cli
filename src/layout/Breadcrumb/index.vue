<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }"> 首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {
      currentPathName: this.$route.meta.title,
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(newValue, oldValue) {
      // console.log(oldValue);
      this.currentPathName = newValue.meta.title
    },
  },
}
</script>
<style lang="scss"></style>

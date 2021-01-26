<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="电量查询" name="first">
        <user-manag></user-manag>
      </el-tab-pane>
      <el-tab-pane label="CURD" :lazy="true" name="second">
        <user-manag></user-manag>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userManag from './pages/page-data.vue'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: { userManag }
}
</script>
<style lang='scss'>

</style>

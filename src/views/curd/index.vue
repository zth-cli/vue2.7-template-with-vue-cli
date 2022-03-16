<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="电量查询" name="first">
        <page-data></page-data>
      </el-tab-pane>
      <el-tab-pane label="CURD" :lazy="true" name="second">
        <curd-view></curd-view>
      </el-tab-pane>
       <el-tab-pane label="FlowBar" :lazy="true" name="thrith">
       <flow-view></flow-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CurdView from './pages/curd-view.vue'
import FlowView from './pages/flow-view.vue'
import PageData from './pages/page-data.vue'
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
  components: { PageData,CurdView, FlowView }
}
</script>
<style lang='scss'>

</style>

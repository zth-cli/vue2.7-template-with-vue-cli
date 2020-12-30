<template>
  <div class="mains">
    <div class="content">
      <div class="view">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="电量查询" name="first">
            <user-manag></user-manag>
          </el-tab-pane>
          <el-tab-pane label="CURD" :lazy="true" name="second">
            <curd-view></curd-view>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import userManag from './pages/page-data.vue'
import curdView from './pages/curd-view.vue'
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
  components: { userManag, curdView }
}
</script>
<style lang='scss'>
.mains{
  box-sizing: border-box;
  padding: 0 18px;
  height: 100%;
}
.content{
  width: 100%;
  height: 100%;
  .view{
     width: 100%;
    height: 100%;
  }
}
</style>

<!--
 * @Author: rzx007
 * @Date: 2021-05-24 12:06:33
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-30 19:16:05
 * @FilePath: \vue-template-with-elementui\src\components\error.vue
 * @Description: Do not edit
-->
<template>
   <el-alert
    title="组件加载失败"
    type="error">
  </el-alert>
</template>

<script>
import moban, { colunmsList, optionsList } from '@/mock/moban.js'
export default {
  created () {
    console.log(moban)
    console.log(colunmsList)
  }
}
</script>

<style>

</style>

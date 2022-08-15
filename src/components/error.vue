<!--
 * @Author: rzx007
 * @Date: 2021-05-24 12:06:33
 * @LastEditors: 阮志雄
 * @LastEditTime: 2022-08-15 15:56:45
 * @FilePath: \vue-template-with-elementui\src\components\error.vue
 * @Description: Do not edit
-->
<template>
  <el-alert title="组件加载失败" type="error"> </el-alert>
</template>

<script>
import moban, { colunmsList } from '@/mock/moban.js'
export default {
  name: 'ErrorComponent',
  created() {
    console.log(moban)
    console.log(colunmsList)
  },
}
</script>

<style></style>

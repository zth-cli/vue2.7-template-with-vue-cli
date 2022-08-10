<template>
  <div class="content-main">
    <transition  :name="mode ? 'slide-fade-Y' : 'slide-fade-X'">
      <keep-alive v-if="$route.meta.isCache">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isShow: true // 控制router-view的隐藏与展示,达到刷新效果
    }
  },
  // 提供可注入子组件属性
  provide() {
    return { reload: this.reload }
  },
  computed: { ...mapGetters(['mode']) },
  methods: {
    reload() {
      this.isShow = false
      // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        this.isShow = true
      })
    }
  }
}
</script>
<style lang="scss"></style>

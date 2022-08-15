<template>
  <div class="content-main">
    <transition :name="mode ? 'slide-fade-Y' : 'slide-fade-X'">
      <keep-alive v-if="$route.meta.isCache">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <transition :name="mode ? 'slide-fade-Y' : 'slide-fade-X'">
      <router-view v-if="!$route.meta.isCache"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ZthMain',
  data() {
    return {
      isShow: true, // 控制router-view的隐藏与展示,达到刷新效果
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
    },
  },
}
</script>
<style lang="scss">
/* 离开 */
.slide-fade-X-leave-active {
  transition: all 500ms;
  opacity: 0;
  transform: scale(0);
  transform: translateX(50px);
}
/* 进入 */
.slide-fade-X-enter-active {
  transition: all 500ms;
  opacity: 0;
  transform: scale(1);
  transform: translateX(-50px);
}
/* 离开 */
.slide-fade-Y-leave-active {
  transition: all 500ms;
  opacity: 0;
  transform: scale(0);
  transform: translateY(50px);
}
/* 进入 */
.slide-fade-Y-enter-active {
  transition: all 500ms;
  opacity: 0;
  transform: scale(1);
  transform: translateY(-50px);
}
</style>

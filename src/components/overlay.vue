<template>
  <transition name="fade">
    <div class="overlay" v-show="close">
      <div
        :style="{height:oheight,width:owidth}"
        :class="{full_screen:isFullScreen}"
        class="overlay_main"
        @click.stop
      >
        <!-- <span class="close" title="关闭" @click="switchs();changeSatus()"></span> -->
        <div class="overlay_head">
          {{title}}
          <div class="fr close_btn">
            <!-- <span><svg-icon icon="zuixiaohua" class="ol_icon"></svg-icon></span> -->
            <span @click="fullScreen();">
              <i class="ol_icon el-icon-full-screen"></i>
            </span>
            <span @click="switchs();changeSatus();">
              <i class="ol_icon el-icon-close"></i>
            </span>

            <!-- <i class="icon-error ol_icon" @click="switchs();changeSatus();"></i> -->
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'overlay',
  data () {
    return {
      isFullScreen: false
    }
  },
  props: {
    close: {
      type: Boolean,
      default: false
    },
    oheight: String,
    owidth: String,
    title: String,
    lazy: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    fullScreen () {
      this.isFullScreen = !this.isFullScreen
    },
    switchs () {
      this.$emit('update:close', false)
    },
    changeSatus () {
      // 事件
      this.$emit('changeSatus', this.close) // 触发自定义事件
    }
  }
}
</script>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  .full_screen {
    width: 100% !important;
    height: 100% !important;
  }
  .overlay_main {
    position: relative;
    @include base-background();
    box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    overflow-x: hidden;
    transition: all 0.2s ease-in;
    .overlay_head {
      @include tool-bar-color();
      @include border-color();
      border-bottom: 1px solid transparent;
      text-align: start;
      height: 30px;
      padding: 2px 4px;
      line-height: 30px;
      font-size: 16px;
      .close_btn {
        cursor: pointer;
        .ol_icon {
          margin-left: 14px;
          font-size: 20px;
          &:hover {
            color: #e8ebee;
          }
        }
      }
    }
  }
}
</style>

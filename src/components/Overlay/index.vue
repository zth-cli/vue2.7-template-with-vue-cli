<template>
  <transition name="slide-fade">
    <div class="overlay" v-show="close">
      <div
        v-dialogDrag="{ dialogDrag: isDialogDrag, handle: '.overlay_head' }"
        ref="overlay_main"
        :style="{ height: oheight, width: width }"
        :class="{ full_screen: isFullScreen }"
        class="overlay_main"
        @click.stop
      >
        <!-- <span class="close" title="关闭" @click="switchs();changeSatus()"></span> -->
        <div class="overlay_head" @dblclick.stop="fullScreen()">
          {{ title }}
          <div class="fr close_btn">
            <!-- <span><svg-icon icon="zuixiaohua" class="ol_icon"></svg-icon></span> -->
            <span @click="fullScreen()">
              <i class="ol_icon el-icon-full-screen"></i>
            </span>
            <span
              @click="
                switchs()
                changeSatus()
              "
            >
              <i class="ol_icon el-icon-close"></i>
            </span>

            <!-- <i class="icon-error ol_icon" @click="switchs();changeSatus();"></i> -->
          </div>
        </div>
        <div class="overlay_view">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OverLay',
  data() {
    return {
      isFullScreen: false,
      sizeArr: {
        mini: '30vw',
        small: '60vw',
        large: '90vw',
      },
    }
  },
  props: {
    close: {
      type: Boolean,
      default: false,
    },
    oheight: {
      type: String,
      default: '',
    },
    owidth: {
      type: String,
      default: '',
    },
    title: String,
    lazy: {
      type: Boolean,
      default: false,
    },
    isDialogDrag: {
      // 控制弹框拖拽
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  methods: {
    fullScreen() {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        this.$refs.overlay_main.style.left = '0px'
        this.$refs.overlay_main.style.top = '0px'
      }
    },
    switchs() {
      this.$emit('update:close', false)
    },
    changeSatus() {
      // 事件
      this.$emit('changeSatus', this.close) // 触发自定义事件
    },
  },
  computed: {
    width: function () {
      return this.owidth ? this.owidth : this.sizeArr[this.size]
    },
  },
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
    transition: all 0.21s ease-in-out;
    width: 100vw !important;
    height: 100vh !important;
  }
  .overlay_main {
    position: relative;
    @include base-background();
    box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    overflow-x: hidden;
    // transition: all 0.2s ease-in;  //拖拽延迟
    box-sizing: content-box;
    margin: 0 auto;
    // transition: all .21s ease-in-out;
    .overlay_head {
      @include tool-bar-color();
      @include border-color();
      border-bottom: 1px solid transparent;
      text-align: start;
      height: 30px;
      padding: 2px 8px;
      line-height: 30px;
      font-size: 16px;
      cursor: pointer;
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
    .overlay_view {
      box-sizing: border-box;
      width: 100%;
      height: calc(100% - 35px);
      overflow: auto;
      // padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      // justify-content: center;
      .form_btn {
        text-align: center;
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>

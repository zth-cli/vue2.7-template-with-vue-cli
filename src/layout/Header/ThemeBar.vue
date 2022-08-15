<template>
  <el-drawer
    title="主题配置"
    append-to-body
    :visible.sync="visible"
    :styles="styles"
    @close="change"
    size="300px"
  >
    <ul class="theme-list">
      <li class="theme-item">
        <p>菜单布局</p>
        <div class="drawer-block-checkbox">
          <div
            class="drawer-block-checkbox-item drawer-block-checkbox-item-slide"
            @click="
              layout.menuModeisVertical = true
              saveTheme()
            "
          >
            <i class="selectIcon el-icon-check" v-show="layout.menuModeisVertical" />
          </div>
          <div
            class="drawer-block-checkbox-item drawer-block-checkbox-item-top"
            @click="
              layout.menuModeisVertical = false
              saveTheme()
            "
          >
            <i class="selectIcon el-icon-check" v-show="!layout.menuModeisVertical" />
          </div>
        </div>
      </li>
      <li class="theme-item">
        <p>主题颜色</p>
        <div class="drawer-block-checkbox">
          <template v-for="(item, index) in colors">
            <div
              class="theme-color-block"
              :style="{ background: item.color }"
              :key="index"
              @click="
                changeTheme(item.theme)
                themeName = item.theme
              "
            >
              <i class="selectIcon el-icon-check" v-show="themeName === item.theme" />
            </div>
          </template>
        </div>
      </li>
      <li class="theme-item">
        <span>多标签</span>
        <el-checkbox v-model="layout.tagsBar" @change="saveTheme()"></el-checkbox>
      </li>
    </ul>
  </el-drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import bus from '@/utils/bus'
import themes from '@/utils/themeMap'
export default {
  data() {
    return {
      colors: themes,
      themeName: localStorage.getItem('theme') || 'theme2',
      layout: {
        menuModeisVertical: localStorage.getItem('menuModeisVertical') === 'true',
        tagsBar: localStorage.getItem('tagsBar') === 'true',
      },
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static',
      },
    }
  },
  props: {
    status: {
      defalut: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(['mode', 'tagsBar']),
    visible: function () {
      return this.status
    },
  },
  methods: {
    change(bool) {
      this.$emit('visibleChange', bool)
    },
    ...mapActions({
      changeSetting: 'settings/changeSetting',
    }),
    saveTheme() {
      for (const key in this.layout) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.layout.hasOwnProperty(key)) {
          const element = Boolean(this.layout[key])
          console.log(element)
          this.changeSetting({ key, value: element })
        }
      }
    },
    changeTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme)
      document
        .getElementById('theme')
        .setAttribute('href', `${process.env.BASE_URL}theme/${theme}/index.css`)
      localStorage.setItem('theme', theme)
      bus.$emit('changMenuColor', theme)
    },
  },
}
</script>
<style lang="scss">
.theme-list {
  box-sizing: border-box;
  padding: 0 18px;
  @include font_color(null);
  .theme-item {
    margin-bottom: 18px;
    p {
      margin-block: 12px;
    }
    .drawer-block-checkbox {
      display: flex;
      .drawer-block-checkbox-item {
        position: relative;
        margin-right: 16px;
        box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        width: 44px;
        height: 36px;
        background-color: #f0f2f5;
        .selectIcon {
          position: absolute;
          bottom: 4px;
          right: 6px;
          @include font_color(null);
          font-weight: 700;
          font-size: 14px;
          pointer-events: none;
        }
      }
      .drawer-block-checkbox-item-slide {
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          @include header-background();
          content: '';
          z-index: 1;
        }
        &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          @include header-background();
          content: '';
        }
      }
      .drawer-block-checkbox-item-top {
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: transparent;
          content: '';
          z-index: 1;
        }
        &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          @include header-background();
          content: '';
        }
      }
      .theme-color-block {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        color: #fff;
        font-weight: 700;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        position: relative;
        .selectIcon {
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          pointer-events: none;
        }
      }
    }
    span {
      margin-right: 12px;
    }
  }
}
</style>

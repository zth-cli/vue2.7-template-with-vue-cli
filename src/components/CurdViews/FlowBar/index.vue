<template>
  <div class="curd-condition-bar">
    <template v-for="(item, index) in options">
      <section class="condition-item" v-if="!item.type || item.type === 'list'" :key="index">
        <div class="category-title ellipsis">
          <span class="title">{{ item.title }}：</span>
        </div>
        <div
          ref="categorys"
          :class="[switchData[item.name] ? 'category-content-auto' : '', 'category-content']"
        >
          <el-button
            v-if="item.options.length > 1"
            size="small"
            style="margin-top: 6px"
            :disabled="item.disabledAll"
            @click="
              resetItemActive(index)
              formData[item.name] = []
            "
            :type="formData[item.name].length ? 'text' : 'primary'"
            >全部</el-button
          >
          <ul class="item-ul">
            <li class="item-li" v-for="(ele, inde) in item.options" :key="ele.value">
              <el-button
                size="small"
                @click="
                  setActive(item, index, inde)
                  setValue(item, ele.value)
                "
                :type="
                  item.options.length < 2 ? 'primary' : isActive(index, inde) ? 'primary' : 'text'
                "
              >
                {{ ele.label }}
              </el-button>
            </li>
          </ul>
        </div>
        <div class="category-more">
          <el-button
            size="small"
            style="margin-top: 6px"
            @click="switchData[item.name] = !switchData[item.name]"
            type="text"
            :icon="!switchData[item.name] ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
          >
            {{ !switchData[item.name] ? '展开' : '收起' }}
          </el-button>
        </div>
      </section>
    </template>
    <ConditionBar :searchDynamic="options" @query="query" @params-change="paramsChange">
      <template v-slot:tool>
        <slot name="tool"></slot>
      </template>
      <template v-slot:ltool>
        <slot name="ltool"></slot>
      </template>
      <template v-slot:rtool>
        <slot name="rtool"></slot>
      </template>
    </ConditionBar>
  </div>
</template>

<script>
import ConditionBar from '@/components/CurdViews/ConditionBar'
export default {
  name: 'FlowBar',
  data() {
    return {
      anchor: [],
      formData: {},
      switchData: {},
    }
  },
  components: { ConditionBar },
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: function () {
        return [
          {
            name: 'area',
            title: '接入电网',
            disabledAll: false,
            options: [{ label: '省调公司', value: '1232213213' }],
          },
        ]
      },
    },
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler: function () {
        this.initFromData()
      },
    },
    switchData: {
      // 重置scrolltop
      deep: true,
      handler: function () {
        this.$nextTick(() => {
          if (this.$refs.categorys) {
            this.$refs.categorys.forEach((element) => {
              element.scrollTop = 0
            })
          }
        })
      },
    },
  },
  methods: {
    initFromData() {
      this.options.forEach((item) => {
        if (item.type === 'list' || !item.type) {
          this.$set(this.formData, item.name, [])
          this.$set(this.switchData, item.name, false)
        }
      })
    },
    setValue(item, val) {
      if (this.multiple) {
        const index = this.formData[item.name].indexOf(val)
        if (index > -1) {
          // 多选存在，删除值
          this.formData[item.name].splice(index, 1)
        } else {
          this.formData[item.name].push(val)
        }
      } else {
        this.formData[item.name] = [val]
      }
      this.$emit('params-change', this.formData)
    },
    setActive(item, index, i) {
      // if (!item.multiple) {
      //   this.anchor.forEach((ele, indx) => {
      //     if (ele.split('~')[0] === String(index)) {
      //       this.anchor.splice(indx, 1)
      //     }
      //   })
      // }
      const id = String(index) + '~' + String(i)
      if (this.multiple) {
        if (this.anchor.indexOf(id) < 0) {
          this.anchor.push(id)
        } else {
          const i = this.anchor.indexOf(id)
          this.anchor.splice(i, 1)
        }
      } else {
        this.anchor = [id]
      }
    },
    resetItemActive(index) {
      const arr = this.anchor.filter((ele) => {
        return ele.split('~')[0] !== String(index)
      })
      this.anchor = arr
    },
    // resetAllActive() {},
    isActive(index, i) {
      return this.anchor.includes(String(index) + '~' + String(i))
    },
    // 输入框
    paramsChange(params) {
      this.formData = Object.assign({}, this.formData, params)
      this.$emit('params-change', this.formData)
    },
    query(params) {
      this.$emit('query', { ...params, ...this.formData })
    },
  },
}
</script>
<style lang="scss">
$linehieht: 40px;
.curd-condition-bar {
  @include content-background();
  margin-bottom: 12px;
  border-radius: 4px;
  padding: 0 12px;
  .condition-item {
    &:last-child {
      border-bottom: none;
    }
    padding: 8px 0;
    border-bottom: 1px dashed #21a5bd;
    // @include border-color();
    // line-height: 50px;
    display: flex;
    .category-title {
      @include font_color(null);
      width: 130px;
      width: 130px;
      line-height: 46px;
    }
    .category-more {
      @include font_color(null);
      width: 80px;
      text-align: center;
    }
    .category-content-auto {
      height: 200px !important;
      overflow: auto !important;
    }
    .category-content {
      display: flex;
      align-items: flex-start;
      flex: 1;
      height: $linehieht;
      overflow: hidden;
      .item-ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .item-li {
          line-height: $linehieht;
          transition: all 0.3s linear;
          margin-left: 14px;
        }
      }
    }
  }
}
</style>

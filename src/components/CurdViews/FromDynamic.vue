<template>
  <div class="curd_tool_bar">
    <div class="curd_tool_content">
      <div class="curd_tools">
        <template v-for="(item, index) in searchDynamic">
          <template v-if="item.type === 'date' || item.type === 'datetime'||item.type === 'month'||item.type === 'year'">
            <div :key="'item' + index" class="curd_tool_item">
              <label class="label">{{ item.label }}：</label>
              <el-date-picker :type="item.type" :disabled="item.disabled" :placeholder="getPlaceholder(item)" clearable
                v-model="fromData[item.name]" size="mini" style="width: 180px" :value-format="item.format">
              </el-date-picker>
            </div>
          </template>
          <template v-else-if="item.type === 'daterange'">
            <div :key="'item' + index" class="curd_tool_item">
              <label class="label">{{ item.label }}：</label>
              <el-date-picker v-model="fromData[item.name]" :type="item.type" :disabled="item.disabled" clearable
                style="width: 180px" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
              </el-date-picker>
            </div>
          </template>
          <template v-else-if="item.type === 'select'">
            <div :key="'item' + index" class="curd_tool_item">
              <label class="label">{{ item.label }}：</label>
              <el-select v-model="fromData[item.name]" style="width: 180px" filterable clearable
                :multiple="item.multiple ? true : false" size="mini" @change="handleSelectChange">
                <el-option v-for="(ele, i) in item.options" :value="ele.value" :label="ele.label" :key="ele.value + i">
                </el-option>
              </el-select>
            </div>
          </template>
          <template v-else>
            <div class="curd_tool_item" :key="index">
              <label class="label">{{ item.label }}：</label>
              <el-input style="width: 180px" v-model="fromData[item.name]" :placeholder="getPlaceholder(item)"
                size="mini"></el-input>
            </div>
          </template>
        </template>
      </div>
      <div class="btns">
        <el-button type="primary" v-if="searchDynamic.length > 0" size="mini" @click="query()">查询</el-button>
        <slot name="tool"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fromData: {},
      typeArr: [
        'date',
        'daterange',
        'datetime',
        'datetimerange',
        'year',
        'month',
        'time',
        'timerange'
      ]
    }
  },
  props: {
    searchDynamic: {},
    toolAlign: {
      default: 'left'
    }
  },
  methods: {
    getPlaceholder (item) {
      if (this.placeholderLabel) {
        return item.label
      }
      let result
      if (item.placeholder == null) {
        switch (item.type) {
          case 'text':
            result = item.disabled || item.readonly ? '' : item.label
            break
          case 'popText':
            result = item.disabled || item.readonly ? '' : '请选择...'
            break
          case 'time':
            result = item.disabled || item.readonly ? '' : '选择时间'
            break
          case 'datetime':
          case 'date':
            result = item.disabled || item.readonly ? '' : '选择日期'
            break
          case 'datetimerange':
            result = item.disabled || item.readonly ? '' : '选择时间段'
            break
          case 'year':
            result = item.disabled || item.readonly ? '' : '选择年份'
            break
          default:
            result = ''
            break
        }
      } else {
        result = item.placeholder
      }
      return result
    },
    defaultDate () {
      //  时间控件初始值
      this.searchDynamic.forEach((item) => {
        for (const key in item) {
          if (key === 'name') {
            const str = item[key]
            this.$set(this.fromData, [str], '')
          }
        }
        if (this.typeArr.includes(item.type)) {
          this.fromData[item.name] = item.default
            ? item.default
            : this.$day().format(item.format.toUpperCase())
            // this.$emit("params-change", this.fromData);
        }
        if (item.type === 'select') {
          this.fromData[item.name] = item.default ? item.default : ''
        }
      })
    },
    query () {
      this.$emit('query', this.fromData)
    },
    handleSelectChange (row) {
      this.$emit('select-form-change', row)
    }
  },
  created () {
    if (this.searchDynamic) {
      this.defaultDate()
    }
  },
  watch: {
    fromData: {
      handler: function (val) {
        this.$emit('params-change', val)
      },
      deep: true
    }
  }
}

</script>
<style lang='scss'>
  .curd_tool_bar {
    // background-color: #fff;
    @include content-background();
    @include border-color();
    @include box-shadow();
    padding: 10px;
    border-radius: 4px;
    // border: 1px solid #ebeef5;
    margin-bottom: 20px;
  }

  .curd_tool_content {
    display: flex;
    align-items: center;
  }

  .curd_tools {
    flex: 1;
    text-align: end;
    /* display: flex;
  flex-wrap: wrap; */
  }

  .curd_tool_item {
    display: inline-block;
    margin-left: 10px;
    /* margin-bottom: 10px;
  margin-right: 10px; */
  }

  .label {
    font-size: 12px;
    color: #797373;
  }

  /* .el-input {
  width: 180px;
} */
  .curd_tool_content .btns {
    max-width: 800px;
    button{
      margin-left: 8px;
    }
  }

</style>

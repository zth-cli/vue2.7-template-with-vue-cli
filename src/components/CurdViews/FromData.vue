<template>
  <div class="from_data_main">
    <el-form :model="fromData" :rules="rules" ref="ruleForm" label-width="100px" :class="[
        fromItems.length >= 5 ? 'from_data_content_lg' : 'from_data_content_mini',
      ]">
      <template v-for="item in fromItems">
        <template v-if="item.type === 'date' || item.type === 'datetime'">
          <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
            <el-date-picker style="width: 220px" :type="item.type" :disabled="item.disabled"
              :placeholder="getPlaceholder(item)" clearable v-model="fromData[item.name]" size="mini"
              :value-format="item.format" default-time="12:00:00"></el-date-picker>
          </el-form-item>
        </template>
         <template v-if="item.type === 'month' || item.type === 'year'">
          <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
            <el-date-picker style="width: 220px" :type="item.type" :disabled="item.disabled"
              :placeholder="getPlaceholder(item)" clearable v-model="fromData[item.name]" size="mini"
              :value-format="item.format"></el-date-picker>
          </el-form-item>
        </template>
        <template v-else-if="item.type === 'daterange'">
          <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
            <el-date-picker style="width: 220px" v-model="fromData[item.name]" :type="item.type"
              :disabled="item.disabled" clearable range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
              size="mini"></el-date-picker>
          </el-form-item>
        </template>
        <template v-else-if="item.type === 'select'">
          <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
            <el-select v-model="fromData[item.name]" filterable :disabled="item.disabled" clearable :style="{width: item.width?item.width+'px':'220px'}"
              :multiple="item.multiple ? true : false" size="mini" @change="handleSelectChange">
              <el-option v-for="ele in item.options? item.options:[]" :value="ele.value" :label="ele.label"
                :key="ele.label">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
        <template v-else-if="item.type === 'radio'">
          <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
            <el-radio-group v-model="fromData[item.name]">
              <template v-for="ele in item.options">
                <el-radio :disabled="item.disabled" :label="ele.value" :key="ele.value">{{ ele.label }}</el-radio>
              </template>
            </el-radio-group>
          </el-form-item>
        </template>
        <template v-else-if="item.type === 'checkbox'">
          <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
            <el-checkbox-group v-model="fromData[item.name]">
              <template v-for="ele in item.options">
                <el-checkbox :disabled="item.disabled" :label="ele.value" :key="ele.value">{{ ele.label }}</el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item class="from_item" :key="item.name" :label="item.label" :prop="item.name">
            <el-input :disabled="item.disabled" :type="item.type" v-model="fromData[item.name]"
              :placeholder="getPlaceholder(item)" size="mini" style="width: 220px"></el-input>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <div class="btns">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')" class="warning">重置</el-button>
    </div>
  </div>
</template>

<script>
import { apiPost } from '@/api'
export default {
  data () {
    return {
      fromData: {},
      fromItems: this.fromItem,
      rules: {}, // 表单验证规则
      typeArr: [
        'date',
        'daterange',
        'datetime',
        'datetimerange',
        'year',
        'month',
        'time',
        'timerange',
        'radio',
        'checkbox',
        'select',
        'text',
        'input',
        'textarea'
      ],
      dateType: [
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
    fromItem: {},
    postUrl: {
      type: String
    }, // 表单提交地址 post请求
    postParams: {}, // 默认提交数据,例如在提交表单时，会把选中母线id一同提交进来
    rowData: {}, // 编辑已有表单数据，key和fromData的key值一样
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
          case 'textarea':
            result = item.disabled || item.readonly ? '' : '请输入内容'
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
      this.fromItem.forEach((item) => {
        for (const key in item) {
          if (key === 'name') {
            const str = item[key]
            this.$set(this.fromData, [str], '')
          }
          if (key === 'rules') {
            this.rules[item.name] = item[key]
          }
          if (
            key === 'remoteMethod' &&
              item.remoteMethod &&
              item.type === 'select'
          ) {
            item.remoteMethod.then((res) => {
              item.options = res
            })
          }
        }
        if (this.typeArr.includes(item.type)) {
          const keys = Object.keys(this.postParams)
          const defaultValue = keys.includes(item.name) ? this.postParams[item.name] : item.default ? item.default
            : ''
          this.fromData[item.name] = defaultValue
          // console.log(item.default);
          if (this.dateType.includes(item.type)) {
            this.fromData[item.name] = item.default
              ? item.default
              : this.$day().format(item.format.toUpperCase())
          }
          // this.$emit("params-change", this.fromData);
        }
        if (this.rowData) {
          // eslint-disable-next-line no-unused-expressions
          this.rowData[item.name] ? this.fromData[item.name] = this.rowData[item.name] : '' // 赋值对应key
        }
      })
      // console.log(this.fromData);
    },
    handleSelectChange (row) {
      this.$emit('select-form-change', row)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        // eslint-disable-next-line no-unused-expressions
        this.postParams ? this.fromData = Object.assign({}, this.postParams, this.fromData) : ''
        console.log(this.fromData)
        if (valid) {
          apiPost(this.postUrl, this.fromData)
            .then((res) => {
              if (res.data.code === 1) {
                this.$emit('submit', res.data.data)
                this.$notify({
                  title: '提示',
                  message: '已提交',
                  duration: 1500,
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '提示',
                  message: '提交异常',
                  duration: 1500,
                  type: 'error'
                })
              }
            })
            // eslint-disable-next-line handle-callback-err
            .catch((err) => {
              this.$notify({
                title: '提示',
                message: '提交异常',
                duration: 1500,
                type: 'error'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    if (this.fromItem) {
      this.defaultDate()
      // console.log(this.rules);
    }
  },
  watch: {
    fromData: {
      handler: function (val) {
        this.$emit('from-change', val)
      },
      deep: true
    },
    postParams: {
      handler: function (val) {
        this.defaultDate()
      },
      deep: true
    }
  }
}

</script>
<style>
  .from_data_main {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  .from_data_content_mini .from_item {
    margin-top: 12px;
    display: flex;
    justify-content: center;
  }

  .from_data_content_mini .from_item .el-form-item__content {
    margin-left: 0 !important;
  }

  .from_item_label {
    display: inline-block;
    min-width: 100px;
    text-align: end;
  }

  .from_data_content_lg {
    display: grid;
    grid-template-columns: repeat(auto-fill, 33.3%);
    justify-content: space-around;
    /* flex-wrap: wrap; */
    box-sizing: border-box;
    padding: 12px;
  }

  .from_data_main .btns {
    margin-top: 18px;
    text-align: center;
    padding-bottom: 12px;
  }

</style>

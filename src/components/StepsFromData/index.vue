<template>
  <div class="steps_from_data_main" :class="[direction=='vertical'?'steps_vertical':'']">
    <el-steps  :active="active" finish-status="success" :direction="direction">
      <el-step v-for="(item,index) in stepsForm" :key="index" :title="stepsLabel[index]"></el-step>
    </el-steps>
    <div class="steps_from_item">
    <div v-for="(fromItem,index) in stepsForm"  :key="index">
      <from-layout v-show="active===index+1" :fromItem='fromItem' @from-change='getFormData'></from-layout>
    </div>
     <div class="btns" >
      <el-button @click=" active--" v-show="active > 1" size='mini'>上一步</el-button>
      <el-button @click=" active++" size='mini' v-show='active <= stepsForm.length - 1'>下一步</el-button>
      <el-button type="primary" size='mini' v-show='active === stepsForm.length'>提交</el-button>
      <!-- <el-popover placement="top" style="margin-left: 10px;" width="160" v-model="visible" v-show='active === stepsForm.length'>
        <p>此操作将会清空所有表单内容！</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="visible = false;resetForm()">确定</el-button>
        </div>
        <el-button slot="reference" type="danger" size='mini'>重置</el-button>
      </el-popover> -->
    </div>
    </div>
  </div>
</template>

<script>
import { apiPost } from '@/api'
import FromLayout from '../FromData/index'
export default {
  data () {
    return {
      active: 1,
      fromData: { },
      visible: false
    }
  },
  components: { FromLayout },
  props: {
    stepsForm: { // 表单集合
      type: Array,
      default: function () {
        return []
      }
    },
    stepsLabel: {}, // 步骤名称
    direction: { // 步骤条方向 vertical/horizontal
      default: 'vertical'
    }
  },
  methods: {
    getFormData (data) {
      this.fromData = Object.assign({}, this.fromData, data)
      console.log(this.fromData)
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
    resetForm () {
      this.fromData = {}
    }
  }

}

</script>
<style>
  .steps_from_data_main {
    width: 100%;
    height: 100%;
    overflow: auto;
    /* background-color: #ffffff; */
    box-sizing: border-box;
    padding: 10px;
    display: flex;
  }
  .steps_from_data_main .btns {
    margin-top: 18px;
    text-align: center;
    padding-bottom: 12px;
  }
  .steps_vertical .el-steps--vertical{
    width: 15%;
  }
  .steps_vertical .steps_from_item{
    flex: 1;
  }
</style>

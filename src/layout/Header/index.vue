<template>
  <div class="header" :class="[mode ? 'light-header' : 'default-header']">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" v-if="mode">
      <i
        @click="
          collapse = !collapse
          handleCollapse()
        "
        :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      ></i>
    </div>
    <Breadcrumb v-if="mode" class="breadcrumb"></Breadcrumb>
    <div class="slogan ellipsis" @click="$router.push('/')" title="首页">
      {{ slogan }}
    </div>
    <div class="header-menu">
      <slot></slot>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="tool-icon" style="transform: rotate(45deg)">
          <el-tooltip :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
            <i class="el-icon-rank" @click="handleFullScreen"></i>
          </el-tooltip>
        </div>
        <div class="tool-icon">
          <el-tooltip content="重载" placement="bottom">
            <i class="el-icon-refresh-right" @click="reloadPage()"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <!-- <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
           <i class="el-icon-bell"></i>
        </el-tooltip>
        <div class="btn-bell">
          <span class="btn-bell-badge" v-if="message"></span>
        </div> -->
        <div class="tool-icon">
          <el-tooltip content="设置" placement="bottom">
            <i class="el-icon-setting" @click="switchThemeBar = true" v-if="showThemeBar"></i>
          </el-tooltip>
        </div>
        <!-- 用户头像 -->
        <div class="tool-icon">
          <el-avatar> user </el-avatar>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i f class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-mouse" command="updataPassword"
              >密码修改</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-switch-button" command="loginout"
              >注销</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <theme-bar :status="switchThemeBar" @visibleChange="toggleThemeBar"></theme-bar>
    <overlay :close.sync="close" owidth="400px" oheight="40vh" title="密码修改">
      <div v-if="close" class="addUser">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="登录名称" prop="userName">
            <el-input
              v-model="ruleForm.userName"
              :disabled="true"
              size="mini"
              style="width: 220px"
            ></el-input>
          </el-form-item>
          <el-form-item label="旧密码">
            <el-input
              type="password"
              v-model="ruleForm.oldPwd"
              size="mini"
              auto-complete="off"
              style="width: 220px"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input
              type="password"
              v-model="ruleForm.newPwd"
              size="mini"
              auto-complete="off"
              style="width: 220px"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmNewPwd">
            <el-input
              type="password"
              v-model="ruleForm.confirmNewPwd"
              size="mini"
              auto-complete="off"
              style="width: 220px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </overlay>
  </div>
</template>
<script>
import { removeToken, getToken } from '@/utils'
import Breadcrumb from '../Breadcrumb'
import ThemeBar from './ThemeBar'
import { updataPassword } from '@/api'
import { title } from '@/constants/settings'
import bus from '@/utils/bus'
export default {
  name: 'ZthHeader',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{10,}$/
        const checkValue = reg.test(value)
        if (!checkValue) {
          callback(new Error('输入9位以上由数字和字母组成的密码'))
        } else {
          if (this.ruleForm.confirmNewPwd !== '') {
            this.$refs.ruleForm.validateField('confirmNewPwd')
          }
          callback()
        }
      }
    }
    const validatePass2 = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{10,}$/
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('输入9位以上由数字和字母组成的密码'))
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      slogan: title,
      collapse: false,
      fullscreen: false,
      name: getToken('name') || '管理员',
      message: 2,
      close: false,
      ruleForm: {
        userName: getToken('userName'),
        oldPwd: '',
        newPwd: '',
        confirmNewPwd: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户别名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        oldPwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
        newPwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
        confirmNewPwd: [{ required: true, validator: validatePass2, trigger: 'blur' }],
      },
      switchThemeBar: false,
    }
  },
  props: {
    mode: {
      type: Boolean,
      default: true,
    },
    showThemeBar: {
      type: Boolean,
      default: true,
    },
  },
  components: { ThemeBar, Breadcrumb },
  computed: {
    username() {
      const username = localStorage.getItem('ms_username')
      return username || this.name
    },
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command === 'loginout') {
        removeToken('token')
        this.$router.push('/login')
      } else if (command === 'updataPassword') {
        this.close = true
      }
    },
    updataPassword() {
      updataPassword(this.ruleForm).then((res) => {
        if (res.resultCode === 0) {
          this.$message({
            message: '修改成功，重新登陆',
            type: 'success',
          })
          removeToken('token')
          removeToken('userName')
          this.$router.push('/login')
        } else {
          this.$message({
            message: '修改失败，请重试！',
            type: 'warning',
          })
        }
      })
    },
    // 提交用户信息按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete this.ruleForm.confirmNewPwd
          delete this.ruleForm.userName
          this.updataPassword()
        } else {
          this.$message({
            message: '填写有误，请检查！',
            type: 'warning',
          })
          console.log('error submit!!')
          return false
        }
      })
    },
    // 清空表单信息按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 刷新页面
    reloadPage() {
      this.$router.push({
        path: '/redirect' + this.$route.fullPath,
      })
    },
    // 全屏事件
    handleFullScreen() {
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen()
      }
      this.fullscreen = !this.fullscreen
    },
    toggleThemeBar(bool) {
      this.switchThemeBar = bool
    },
    handleCollapse() {
      bus.$emit('handleCollapse', this.collapse)
    },
  },
}
</script>
<style lang="scss">
$header-height: 60px;
.header {
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: $header-height;
  font-size: 20px;
  @include font_color(#fff);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .collapse-btn {
    margin-right: 12px;
    cursor: pointer;
    &:hover {
      color: #d66a57;
    }
  }
  .breadcrumb {
    margin-right: 24px;
  }
  .slogan {
    cursor: pointer;
    max-width: 250px;
    line-height: $header-height;
    margin-right: 24px;
    // @include font_color(#fff);
    font-weight: bolder;
  }
  i {
    // @include font_color(#fff);
    font-size: 20px;
    cursor: pointer;
  }
  .header-menu {
    height: 100%;
    flex: 1;
  }
  .header-right {
    padding-right: 20px;
  }
  .header-user-con {
    display: flex;
    height: $header-height;
    align-items: center;
  }
  .tool-icon {
    display: inline-block;
    margin-left: 12px;
    font-weight: lighter;
  }
  .btn-bell {
    position: relative;
    /* height: 30px; */
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    line-height: 50px;
    .el-icon-bell {
      // @include font_color(#fff);
    }
  }
  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    // @include font_color(#fff);
  }
  .user-name {
    margin-left: 10px;
  }
  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    @include font_color(#fff);
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
}
.default-header {
  @include header-background();
}
.light-header {
  @include content-background(1);
  @include font_color(null);
  .el-dropdown-link {
    @include font_color(null);
    cursor: pointer;
  }
}
</style>

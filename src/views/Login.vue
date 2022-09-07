<template>
  <div class="login_main">
    <div class="login_content">
      <div class="loginbox">
        <h2 class="login_title">
          <img src="../assets/img/logo1.png" width="163" height="54" alt />
          {{ slogan }}
        </h2>
        <div class="formbox">
          <!--用户名-->
          <div class="bdbox">
            <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="lgusername"></el-input>
          </div>

          <!--密码-->
          <div class="bdbox">
            <el-input
              type="password"
              placeholder="密码"
              v-model="lguserpwd"
              autocomplete="off"
              prefix-icon="el-icon-c-scale-to-original"
            ></el-input>
          </div>
          <el-button type="primary" v-debounce="loginajax" :loading="isLoging" class="login_btn">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setToken } from '@/utils'
import { login } from '@/api'
import { title } from '@/constants/settings'
export default {
  name: 'ZthLogin',
  data: function () {
    return {
      slogan: title,
      lgusername: '',
      lguserpwd: '',
      lgButton: false,
      lgtoken: '',
      isLoging: false,
    }
  },
  watch: {
    lgusername: function () {
      const a = this.lgusername.slice(this.lgusername.length - 1, this.lgusername.length)
      const re = /[A-Za-z]|[\u4e00-\u9fa5]|[0-9]/
      if (!re.test(a)) {
        this.lgusername = this.lgusername.slice(0, this.lgusername.length - 1)
      }
      if (this.lgusername !== '' && this.lguserpwd !== '') {
        this.lgButton = true
      } else {
        this.lgButton = false
      }
    },
    lguserpwd: function () {
      if (this.lgusername !== '' && this.lguserpwd !== '') {
        this.lgButton = true
      } else {
        this.lgButton = false
      }
    },
  },
  methods: {
    loginajax() {
      // 登录验证返回token
      if (!this.lgusername || !this.lguserpwd) {
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning',
        })
        return
      }
      // 6小时失效
      setToken('token', 'token', { expires: 0.25 })
      setToken('userName', 'admin')
      this.$router.push('/')
      this.isLoging = true
      const params = {
        userName: this.lgusername,
        password: this.lguserpwd,
      }
      login(params)
        .then((res) => {
          this.isLoging = false
          // 6小时失效
          setToken('token', res.data.token, { expires: 0.25 })
          setToken('userName', res.data.userName)
          this.$router.push('/')
        })
        .catch(() => {
          this.isLoging = false
        })
    },
    enterLoginajax(e) {
      // 检测密码是否为空之后进行enter事件的监控
      if (e.keyCode === 13) {
        if (this.lgusername !== '' && this.lguserpwd !== '') {
          this.loginajax()
        }
      }
    },
    debounce(fn, wait) {
      let timer
      return function () {
        const that = this
        // eslint-disable-next-line prefer-rest-params
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function () {
          fn.apply(that, args)
        }, wait)
      }
    },
  },
}
</script>
<style lang="scss">
.login_main {
  width: 100%;
  height: 100vh;
  display: flex;
  // @include base-background();
  background: url(../assets/img/wlbg.png) no-repeat 0% 100%;
  justify-content: center;
  align-items: center;
}

.login_content {
  width: 450px;
  height: 280px;
  border-radius: 6px;
  background-color: #fff;
  overflow: hidden;
  @include box-shadow();
  .loginbox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // padding: 10px;
    border-radius: 10px;
  }
}

.loginbox h2 {
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  height: 60px;
  padding: 0 5px;
  margin-bottom: 20px;
  line-height: 60px;
  font-size: 22px;
  @include font_color(#fff);
  font-weight: normal;
  letter-spacing: 2px;
  border-bottom: 1px solid transparent;
  @include border-color();
  @include tool-bar-color();
  img {
    float: left;
    padding-right: 20px;
    margin-top: 3px;
    vertical-align: middle;
  }
}
.formbox {
  width: 90%;
  margin: 0 auto;
}

.bdbox {
  margin-top: 15px;
}

.login_btn {
  width: 100%;
  border-radius: 4px;
  margin-top: 15px;
  transition: all 500ms;
  @include font_color(null);
  cursor: pointer;
  font-size: 16px;
}
</style>

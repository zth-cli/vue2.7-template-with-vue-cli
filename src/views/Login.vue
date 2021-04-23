<template>
  <div class="login_main">
    <vue-particles
      color="#06998e"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#06998e"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <div class="login_content">
      <div class="loginbox">
        <h2 style="text-align: center">
          <!-- <img src="../assets/logo.jpg" width="163" height="54" alt /> -->
          {{slogan}}
        </h2>
        <div class="formbox">
          <!--用户名-->
          <div class="bdbox">
            <el-input
              placeholder="用户名"
              prefix-icon="el-icon-user"
              v-model="lgusername"
            ></el-input>
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
          <el-button
            type="primary"
            v-debounce="loginajax"
            :loading="isLoging"
            class="login_btn"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setToken } from '@/utils/auth'
import { login } from '@/api'
import { title } from '@/settings'
export default {
  data: function () {
    return {
      slogan: title,
      lgusername: '',
      lguserpwd: '',
      lgButton: false,
      lgtoken: '',
      isLoging: false
    }
  },
  watch: {
    lgusername: function () {
      var a = this.lgusername.slice(
        this.lgusername.length - 1,
        this.lgusername.length
      )
      var re = /[A-Za-z]|[\u4e00-\u9fa5]|[0-9]/
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
    }
  },
  methods: {
    loginajax () {
      // 登录验证返回token
      if (!this.lgusername || !this.lguserpwd) {
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning'
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
        password: this.lguserpwd
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
    enterLoginajax (e) {
      // 检测密码是否为空之后进行enter事件的监控
      if (e.keyCode === 13) {
        if (this.lgusername !== '' && this.lguserpwd !== '') {
          this.loginajax()
        }
      }
    },
    debounce (fn, wait) {
      let timer
      return function () {
        const that = this
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function () {
          fn.apply(that, args)
        }, wait)
      }
    }
  }
}
</script>
<style lang='scss'>
.login_main {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  // @include base-background();
  background: url(../assets/img/wlbg.png) no-repeat 0% 100%;
}

.login_content {
  width: 450px;
  height: 280px;
  position: absolute;
  top: 30%;
  right: 50px;
  .loginbox {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid transparent;
    @include border-color();
    border-radius: 10px;
    @include box-shadow();
    // background: #0e9b92 linear-gradient(135deg, #0b827c, #11bab0);
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(../assets/img/wlbg.png) no-repeat 30% 90%;
      z-index: -1;
      filter: blur(5px);
      filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
    }
  }
}

.loginbox h2 {
  width: 100%;
  height: 50px;
  padding-bottom: 5px;
  margin-bottom: 20px;
  line-height: 50px;
  font-size: 24px;
  @include font_color(null);
  font-weight: normal;
  letter-spacing: 2px;
  border-bottom: 1px solid transparent;
  @include border-color();
  img {
    float: left;
    padding-right: 20px;
    vertical-align: middle;
  }
}
.formbox {
  width: 55%;
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

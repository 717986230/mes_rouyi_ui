<template>
  <div class="login">
    <div class="login-head">
      <div class="head-tit">汉克智能制造智慧管理平台</div>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="title">欢迎登陆</div>
      <el-form-item prop="username" class="el-form-item">
        <div class="input-div-flex">
          <div class="div1">

          </div>
          <div class="div2">
            <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="请输入用户名">
            </el-input>
            <img class="icon" src="../assets/images/ren.png" alt="">
          </div>
          <div class="div3"></div>
        </div>
      </el-form-item>
      <el-form-item prop="password" class="el-form-item">
        <div class="input-div-flex">
          <div class="div1">
          </div>
          <div class="div2">
            <el-input v-model="loginForm.password" :type="Type" auto-complete="off" placeholder="请输入密码"
              @keyup.enter.native="handleLogin">
            </el-input>
            <img class="icon" src="../assets/images/suo.png" alt="">
            <img v-if="Color" class="icon-right1" @click="Show" src="../assets/images/yin.png" alt="">
            <img v-if="!Color" class="icon-right2" @click="Show" src="../assets/images/zen.png" alt="">
          </div>
          <div class="div3"></div>
        </div>

      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled" class="el-form-item">
        <div class="input-div-flex">
          <div class="div1">
          </div>
          <div class="div2">
            <el-input style="margin-bottom: 20px;" v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码"
              @keyup.enter.native="handleLogin">
            </el-input>
            <img class="icon" src="../assets/images/dun.png" alt="">
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img" />
            </div>
          </div>
          <div class="div3"></div>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:10px 0px 25px 58px;">记住密码</el-checkbox>
      <!-- <span style="margin:0px 0px 25px 0px; float: right;color: #32C5FF;cursor: pointer;">忘记密码</span> -->
      <el-form-item class="elbtn">
        <el-button :loading="loading" size="medium" type="primary"
          style="width: 194px;height: 81px;font-size: 28px;font-weight: bold;color:#19ECFF;"
          @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <!-- <span>Copyright © 2018-2023 ruoyi.vip All Rights Reserved.</span> -->
    </div>
  </div>
</template>
<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
export default {
  name: "Login",
  data() {
    return {
      Type: "password",
      Color: false,
      codeUrl: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    Show() {
      // 点击改变input框的展示方式
      this.Type = this.Type === "password" ? "text" : "password";
      this.Color = !this.Color;
    },
    getCode() {
      getCodeImg().then(res => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(() => { });
          }).catch(() => {
            this.loading = false;
            if (this.captchaEnabled) {
              this.getCode();
            }
          });
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input__inner {
  background-color: transparent !important;
  display: flex;
  margin: 0 auto;
  font-size: 24px;
  color: #1348AF;
  width: 205px;
  height: 72px !important;
  border: 0 !important;
  &::placeholder {
    color: #1348AF;
  }
}

.login-code {
  margin-left: 130px;
}

.el-form-item__content {
  margin: 10px 0;
}

.el-button--medium {

  background: url('../assets/images/login-btn.png') no-repeat;
}

.input-div-flex {
  display: flex;
  width: 368px;
  margin: 0 auto;
  background: url("../assets/images/form-bg-chil.png")no-repeat center;

  .div1 {
    width: 80px;
    height: 72px;
  }

  .div2 {
    width: 205px;
    height: 72px;

  }

  .div3 {
    width: 80px;
    height: 72px;

  }

}



.login {
  padding-top: 36px;
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/images/login-background.png") no-repeat center;
  background-size: 100% 100%;

  .login-head {
    margin: 0 auto;
    height: 164px;
    width: 1636px;
    background: url("../assets/images/login-head.png") no-repeat center;
    background-size: 100% 100%;

    .head-tit {
      text-align: center;
       font-size: 40px;
      //letter-spacing: 10px;
      font-family: AlibabaPuHuiTi_2_65_Medium;
      font-weight: 400;
      color: #FFFFFF;
      text-shadow: 2px 2px 9px #01153B;
      background: linear-gradient(0deg, #8AFFD2 0%, #00C6FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .login-form {
    background: url("../assets/images/login-form-bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 253px;
    right: 126px;
    width: 524px;
    height: 603px;
    padding: 20px;

    .elbtn {
      margin-top: 40px;
      width: 100%;
      text-align: center;
    }

    .el-form-item {
      position: relative;
      width: 100%;
      text-align: center;

      .icon {
        display: block;
        width: 43px;
        height: 43px;
        line-height: 76px;
        font-size: 28px;
        color: #fff;
        position: absolute;
        top: 16px;
        left: 80px;
      }

      .icon-right1 {
        width: 29px;
        height: 14px;
        line-height: 76px;
        font-size: 28px;
        color: #fff;
        position: absolute;
        top: 32px;
        right: 82px;
        cursor: pointer;
      }

      .icon-right2 {
        width: 43px;
        height: 43px;
        line-height: 76px;
        font-size: 28px;
        color: #fff;
        position: absolute;
        top: 14px;
        right: 74px;
        cursor: pointer;
      }
    }

    .form-bg-chil {
      background: url("../assets/images/form-bg-chil.png");
    }

    .title {
      margin: 10px 0;
      font-weight: 400;
      text-align: center;
      font-size: 43px;
      color: #32c5ff;
      letter-spacing: 10px;
      font-family: AlibabaPuHuiTi_2_65_Medium;
    }
  }
}
</style>

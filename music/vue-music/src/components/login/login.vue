<!--登录页-->
<template>
  <div id="login">
    <div class="content">
      <div class="switches-wrapper">
        <switches :switches="switches" :current-index="currentIndex" @switch="switchItem" />
      </div>
      <!-- 登录 -->
      <form v-if="currentIndex == 0" class="login-form">
        <label class="form-label" for="username">
          <span class="label">账号</span>
          <input id="username" v-model="form.name" type="text" placeholder="请输入用户名">
        </label>

        <label class="form-label" for="password">
          <span class="label">密码</span>
          <input
            id="password"
            v-model="form.password"
            placeholder="请输入密码"
            @keyup.enter="_login"
          >
        </label>
        <div class="button" @click.prevent="_login">
          <span>登录</span>
        </div>
      </form>
      <!-- 注册 -->
      <form v-else class="login-form">
        <label class="form-label" for="username">
          <span class="label">账号</span>
          <input id="username" v-model="form.name" type="text" placeholder="请输入用户名">
        </label>
        <label class="form-label" for="password">
          <span class="label">密码</span>
          <input id="password" v-model="form.password" placeholder="请输入密码">
        </label>
        <label class="form-label" for="password">
          <span class="label">确认密码</span>
          <input id="password" v-model="form.password_2" placeholder="再次输入密码" @keyup.enter="register">
        </label>
        <div class="button" @click.prevent="_register">
          <span>注册</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
// import { setInfo } from "@/utils/auth";
import Switches from "base/switches/switches";
import { Notify } from "vant";

export default {
  components: { Switches },
  data() {
    return {
      currentIndex: 0,
      switches: [{ name: "登录" }, { name: "注册" }],
      form: {
        name: null, // 用户名
        password: null, // 密码
        password_2: null, // 确认密码
      },
    };
  },
  methods: {
    switchItem(index) {
      this.currentIndex = index;
    },
    changeVisible() {
      this.passwordVisible = !this.passwordVisible;
    },
    _login() {
      const flag = this.validateForm()
      if (!flag) return;
      const { name, password } = this.form
      login({ name, password }).then(res => {
        console.log('login', res);
        const { token } = res;
        localStorage.setItem('token', token)
        this.$router.push('/')
      })
    },
    _register() {
      const flag = this.validateForm(true)
      if (!flag) return;
      const { name, password } = this.form
      register({ name, password }).then(res => {
        console.log('register', res);
        Notify({ type: "success", message: '注册成功' });
      })
    },
    validateForm(isRegister) {
      const { name, password, password_2 } = this.form
      if (!name) {
        Notify({ type: "warning", message: '用户名不能为空' });
        return;
      }
      if (!password) {
        Notify({ type: "warning", message: '密码不能为空' });
        return;
      }
      if (isRegister && (password !== password_2)) {
        Notify({ type: "warning", message: '两次密码不一致' });
        return;
      }
      return true
    },
    resetForm() {
      this.form = {
        name: '',
        password: ''
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="stylus" scoped>
@import '~common/stylus/variable';

#login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background;
  z-index: 999;

  .content {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);

    .switches-wrapper {
      margin: 10px 0 30px 0;
    }

    .login-form {
      .toRegister {
        position: absolute;
        right: 15px;
        font-size: 14px;
        // @include px2rem(line-height, 85);
        font-weight: bold;
      }

      .form-label {
        display: flex;
        margin-top: 20px;
        height: 40px;
        line-height: 40px;

        .label {
          font-size: 14px;
          margin-right: 20px;
          white-space: nowrap;
        }

        .icon {
          font-size: 14px;
        }

        input {
          flex: 1;
          margin: 0 5px;
          background: #333;
          color: #fff;
          font-size: 14px;
          padding-left: 10px;
        }

        ::-webkit-input-placeholder {
          font-size: 14px;
        }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px white inset !important;
        }

        input:focus {
          outline: none;
        }
      }

      .button {
        text-align: center;
        margin-top: 20px;

        span {
          display: inline-block;
          color: #fff;
          width: 60px;
          font-size: 14px;
          background: $color-theme-d;
          height: 34px;
          line-height: 34px;
        }
      }

      .tip {
        font-size: 14px;
        display: block;
        text-align: center;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>

<template>
  <div class="login">
    <div class="login-title">音乐管理系统</div>
    <div class="form-box">
      <el-form
        class="login-form"
        label-position="top"
        size="small"
        :inline-message="inlinemessage"
        :model="loginForm"
        :rules="loginRule"
        ref="loginForm"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="loginForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            @keypress.enter.native="submitForm('loginForm')"
            show-password
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="Security Code" prop="inputCaptcha">
          <div class="yzm">
            <el-input style="width:150px;" v-model="inputCaptcha" placeholder="验证码"></el-input>
            <img
              width="80"
              style="background:#EEE9E9;margin-left:30px;"
              ref="captcha"
              height="32"
              src="http://localhost:8633/api/safecode"
              @click="refreshCaptcha"
            />
          </div>
        </el-form-item>-->
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import wsmLoading from "@/plugins/wsmLoading";
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  data() {
    // const validateCaptcha = (rule, value, callback) => {
    //   if (!this.inputCaptcha.trim().length) {
    //     callback(new Error("请输入验证码~"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      inline: true,
      inlinemessage: false,
      loginForm: {
        name: "",
        // email: "",
        password: ""
      },
      loginRule: {
        // email: [
        //   { required: true, message: "邮箱不能为空", trigger: "blur" },
        //   { type: "email", message: "请输入正确的邮箱", trigger: "blur" }
        // ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度在6-20之间", trigger: "blur" }
        ]
        // inputCaptcha: [
        //   { required: true, validator: validateCaptcha, trigger: "blur" }
        // ]
      }
      // inputCaptcha: ""
    };
  },
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          wsmLoading.start("正在登录,请稍候...");
          this.$axios
            .post("/users/login", this.loginForm)
            .then(res => {
              console.log(res);
              const result = res.result;
              localStorage.setItem("adminToken", result.token);

              const decoded = jwt_decode(result.token);
              console.log(decoded);
              // 存储vuex中
              this.$store.dispatch("setAdminInfo", decoded);
              this.$store.dispatch("isAdminAuthorization", true);
              this.$Message.success(`${decoded.name}登录成功`);
              wsmLoading.end();
              this.$router.push("/");
            })
            .catch(error => {
              console.error(error);
              wsmLoading.end();
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  cursor: default;
  padding: 40px 0px;
  color: red;
  background-image: url(../assets/image/user_service-bg.jpg);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;

  .login-title {
    width: 100%;
    height: 150px;
    line-height: 150px;
    text-align: center;
    font-size: 40px;
    color: aliceblue;
    font-family: "隶书";
  }

  // 表单
  .form-box {
    width: 100%;
    // min-width: 500px;

    .login-form {
      width: 300px;
      margin: 0px auto;
      background-color: rgba(255, 255, 255, 0.9);
      border: 1px solid #cdcdcd;
      padding: 10px 15px;
      border-radius: 5px;

      .login-btn {
        width: 100%;
        background: linear-gradient(to bottom, #03A9F4, #03A9F4);
        font-weight: 600;
      }
      .login-btn:hover {
        background-color: #03A9F4;
      }

      // 验证码区域
      .yzm {
        display: flex;
        align-content: center;
        input {
          width: 160px;
          height: 32px;
          outline: none;
          border: 1px solid #eee;
          padding: 2px 15px;
          border-radius: 5px;
          font-size: 13px;
        }
        ::-webkit-input-placeholder {
          color: #bbb;
        }
        img:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

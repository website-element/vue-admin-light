<template>
  <div class="page-login">
    <el-form
      ref="loginForm"
      class="login-form"
      :rules="loginRules"
      :model="loginForm"
    >
      <el-form-item>
        <p class="text-title">Vue Admin</p>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          prefix-icon="el-icon-user"
          placeholder="username"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          text="password"
          :show-password="true"
          prefix-icon="el-icon-lock"
          placeholder="password"
          @keyup.enter.native="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="btn-login"
          type="primary"
          :loading="loggingIn"
          @click="handleLogin"
          >Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@system/request/login";
import { setAuthToken } from "@system/cookie/auth";

export default {
  name: "LoginView",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loggingIn: false,
      loginRules: {
        username: [
          { required: true, message: "Please input username", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Please input password", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.loginForm)
            .then((res) => {
              setAuthToken(res.data);
              this.$router.push("/");
            })
            .catch((error) => {
              if (error.code !== 401) {
                this.$message.error(error.msg);
              }
            });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.page-login {
  height: 100%;
  background-color: #343a40;
  background-size: cover;

  display: -webkit-flex; /* Safari */
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 450px;
    border-radius: 5px;

    .text-title {
      text-align: center;
      color: #efefef;
      font-size: 36px;
      font-weight: bold;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>

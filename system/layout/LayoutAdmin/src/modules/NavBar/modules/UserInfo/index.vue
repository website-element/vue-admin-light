<template>
  <div class="user-info">
    <el-dropdown trigger="click">
      <div class="el-dropdown-link">
        <img class="img-avatar" :src="avatar" />
        <i class="el-icon-caret-bottom icon-bottom"></i>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from "@system/request/login";
import { removeAuthToken } from "@system/cookie/auth";
import { mapState } from "vuex";

export default {
  name: "UserInfo",
  data() {
    return {
      avatar: require("@system/assets/img/defaultAvatar.jpeg"),
    };
  },
  computed: {
    ...mapState({
      loginInfo: (state) => state.auth.loginInfo,
    }),
  },
  methods: {
    logout() {
      this.$confirm("Logout?", {
        type: "warning",
      })
        .then(() => {
          logout().then(() => {
            removeAuthToken();
            this.$store.dispatch("auth/clearLoginInfo");
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped lang="less">
.user-info {
  line-height: 50px;
  height: 50px;
  cursor: pointer;
  padding: 0 15px;
  outline: none;

  .el-dropdown-link {
    position: relative;
    outline: none;

    .img-avatar {
      width: 37px;
      height: 37px;
      border-radius: 5px;
      vertical-align: middle;
    }

    .icon-bottom {
      position: absolute;
      bottom: 3px;
    }
  }
}
</style>

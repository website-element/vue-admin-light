<template>
  <div class="side-bar">
    <div class="logo-container">
      <router-link class="side-bar-logo-link" to="/">
        <img class="logo" :src="logo" />
        <h1 v-if="sideBar.opened" class="title">{{ title }}</h1>
      </router-link>
    </div>
    <el-scrollbar class="side-bar-scrollbar">
      <el-menu
        background-color="#343a40"
        text-color="#BFCBD9"
        active-text-color="#1890FF"
        :collapse="!sideBar.opened"
        :default-active="activePage"
      >
        <side-bar-item
          v-for="route in routes"
          :item="route"
          :key="route.path + ':' + $utils.createUUID()"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SideBarItem from "./modules/SideBarItem/index";

export default {
  name: "SideBar",
  components: {
    SideBarItem,
  },
  data() {
    return {
      logo: require("@system/assets/img/logo.png"),
      title: "Vue Admin",
    };
  },
  computed: {
    ...mapState({
      sideBar: (state) => state.app.sideBar,
      routes: (state) => state.auth.routes,
    }),
    activePage() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped lang="less">
.side-bar {
  width: 100%;
  height: 100%;

  .logo-container {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #343a40;
    border-bottom: 1px solid #4b545c;
    text-align: center;

    .side-bar-logo-link {
      width: 100%;
      display: inline-block;

      .logo {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        display: inline-block;
      }

      .title {
        color: #ffffff;
        display: inline-block;
        font-size: 14px;
        line-height: 14px;
        margin-left: 10px;
      }
    }
  }

  .side-bar-scrollbar {
    width: 100%;
    height: calc(100% - 50px);

    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;

      .el-menu-item {
        .fa {
          vertical-align: middle;
          margin-right: 5px;
          width: 24px;
          text-align: center;
          font-size: 18px;
        }
      }
      .el-submenu {
        .fa {
          vertical-align: middle;
          margin-right: 5px;
          width: 24px;
          text-align: center;
          font-size: 18px;
        }
      }
    }

    .el-menu {
      border: none;
    }
  }
}
</style>

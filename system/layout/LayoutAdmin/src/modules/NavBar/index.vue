<template>
  <div class="nav-bar clear">
    <i
      class="btn-regular left"
      :class="sideBar.opened ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="toggleSideBar"
    ></i>
    <breadcrumb class="left" />

    <user-info class="comp-user-info right" />
    <i
      class="btn-full-screen btn-normal right"
      :class="isFullscreen ? 'el-icon-close' : 'el-icon-full-screen'"
      @click="toggleScreenFull"
    />
    <header-search class="comp-header-search right" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import screenfull from "screenfull";
import HeaderSearch from "./modules/HeaderSearch";
import Breadcrumb from "./modules/Breadcrumb";
import UserInfo from "./modules/UserInfo";

export default {
  name: "NavBar",
  components: {
    HeaderSearch,
    Breadcrumb,
    UserInfo,
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    ...mapState({
      sideBar: (state) => state.app.sideBar,
    }),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    toggleScreenFull() {
      if (!screenfull.isEnabled) {
        this.$message.warning("Your browser does not support full screen");
        return false;
      }
      screenfull.toggle();
    },
    handleScreenFullChange() {
      this.isFullscreen = screenfull.isFullscreen;
    },
  },
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on("change", this.handleScreenFullChange);
    }
  },
  destroy() {
    if (screenfull.isEnabled) {
      screenfull.on("change", this.handleScreenFullChange);
    }
  },
};
</script>

<style scoped lang="less">
.nav-bar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);

  .comp-user-info {
    margin-right: 20px;
  }

  .comp-header-search {
    margin-right: 10px;
  }

  .btn-regular {
    font-size: 24px;
    color: #343a40;
    line-height: 50px;
    padding: 0 15px;
    cursor: pointer;
  }

  .btn-normal {
    color: #343a40;
    line-height: 50px;
    padding: 0 5px;
    cursor: pointer;
  }

  .btn-full-screen {
    font-size: 24px;
  }
}
</style>

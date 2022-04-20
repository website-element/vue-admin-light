<template>
  <div class="app-layout" :class="{ 'sidebar-collapse': !sideBar.opened }">
    <side-bar class="sidebar-container" />
    <div class="main-container">
      <div class="nav-bar-container">
        <nav-bar />
        <tag-view />
      </div>
      <div class="page-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./modules/SideBar";
import NavBar from "./modules/NavBar";
import TagView from "./modules/TagView";
import { mapState } from "vuex";

export default {
  name: "LayoutAdmin",
  components: { SideBar, NavBar, TagView },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sideBar: (state) => state.app.sideBar,
    }),
  },
};
</script>

<style scoped lang="less">
.app-layout {
  width: 100%;
  height: 100%;

  .sidebar-container {
    width: 210px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #343a40;
    transition: width 0.28s;
    -webkit-transition: width 0.28s;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    z-index: 1001;
  }

  .main-container {
    min-height: 100%;
    margin-left: 210px;
    position: relative;

    .nav-bar-container {
      border-bottom: 1px solid #d3d3d3;
    }

    .page-container {
      padding: 10px;
      width: calc(100% - 20px);
    }
  }

  &.sidebar-collapse {
    .sidebar-container {
      width: 64px;
    }

    .main-container {
      margin-left: 64px;
    }
  }
}
</style>

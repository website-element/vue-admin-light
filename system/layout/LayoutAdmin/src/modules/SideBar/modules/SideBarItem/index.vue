<template>
  <el-submenu v-if="!item.meta.hidden && item.meta.group" :index="item.path">
    <template slot="title">
      <i v-if="item.meta.icon" :class="item.meta.icon"></i>
      <span slot="title"> {{ item.meta.title }}</span>
    </template>

    <side-bar-item
      v-for="child in item.children"
      :item="child"
      :key="child.path + ':' + $utils.createUUID()"
    />
  </el-submenu>
  <router-link class="route-link" v-else-if="!item.meta.hidden" :to="item.path">
    <el-menu-item :index="item.redirect ? item.redirect : item.path">
      <i v-if="item.meta.icon" :class="item.meta.icon"></i>
      <span slot="title"> {{ item.meta.title }}</span>
    </el-menu-item>
  </router-link>
</template>

<script>
export default {
  name: "SideBarItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="less" scoped>
.route-link {
  text-decoration: none;
}
</style>

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-show="!item.meta.hiddenBreadcrumb"
      v-for="item in matched"
      :key="item.name"
      :to="
        (item.meta.group && item.redirect && item.redirect !== $route.path) ||
        (!item.meta.group && item.path !== $route.path)
          ? { path: item.path }
          : null
      "
      >{{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "LayoutBreadcrumb",
  computed: {
    matched() {
      let matched = [];
      this.$route.matched.forEach((item) => {
        if (!item.meta.group && item.redirect) return true;
        matched.push(item);
      });
      return matched;
    },
  },
};
</script>
<style scoped lang="less">
.breadcrumb {
  line-height: 50px;
}
</style>

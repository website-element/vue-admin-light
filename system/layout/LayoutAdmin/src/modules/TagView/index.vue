<template>
  <el-scrollbar class="tag-view-scrollbar">
    <div class="tag-view">
      <router-link
        class="view-item"
        active-class="active"
        :to="item.path"
        v-for="item in tagView.activated"
        :key="item.name"
      >
        <i
          v-if="item.path === $route.path"
          class="icon-activite el-icon-location"
        ></i>
        {{ item.meta.title }}
        <i
          v-if="tagView.activated.length > 1"
          @click.prevent.stop="delView(item)"
          class="icon-del el-icon-close"
        ></i
      ></router-link>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TagView",
  computed: {
    ...mapState({
      tagView: (state) => state.app.tagView,
    }),
  },
  watch: {
    $route(value) {
      if (!value.meta.hiddenTagView) {
        this.$store.dispatch("app/addActivated", value);
      }
    },
  },
  methods: {
    delView(view) {
      this.$store.dispatch("app/delActivated", view);
      if (view.name === this.$route.name) {
        let activated = this.tagView.activated;
        this.$router.push(activated[activated.length - 1].path);
      }
    },
  },
  mounted() {
    if (!this.$route.meta.hiddenTagView) {
      this.$store.dispatch("app/addActivated", this.$route);
    }
  },
};
</script>

<style scoped lang="less">
.tag-view-scrollbar {
  white-space: nowrap;
  width: 100%;
  .tag-view {
    height: 34px;
    .view-item {
      color: #333333;
      text-decoration: none;
      display: inline-block;
      border: 1px solid #efefef;
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      padding: 0 15px;
      margin-left: 5px;
      margin-top: 4px;

      &.active {
        color: #ffffff;
        background-color: #1890ff;
      }
      &:last-child {
        margin-right: 5px;
      }

      .icon-activite {
        font-size: 12px;
        line-height: 26px;
      }

      .icon-del {
        font-size: 12px;
        line-height: 26px;

        &:hover {
          background-color: #ff4500;
          color: #ffffff;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>

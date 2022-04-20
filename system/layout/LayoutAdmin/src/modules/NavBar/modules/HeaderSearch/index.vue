<template>
  <div class="header-search">
    <i class="el-icon-search icon-search" />
    <el-select
      class="search-select"
      prefix-icon="el-icon-search"
      v-model="searchValue"
      placeholder="Search"
      size="small"
      filterable
      remote
      :remote-method="searchRemote"
      @change="selectedSearch"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.path"
        :label="option.title"
        :value="option.path"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import Fuse from "fuse.js";

export default {
  name: "HeaderSearch",
  data() {
    return {
      fuse: undefined,
      searchValue: "",
      searchPool: [],
      searchOptions: [],
    };
  },

  watch: {
    searchPool(value) {
      this.intFuse(value);
    },
    $router(v) {
      console.log(v);
    },
  },
  methods: {
    intFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "title",
            weight: 0.7,
          },
          {
            name: "path",
            weight: 0.3,
          },
        ],
      });
    },
    generatePool(routes) {
      let pools = [];
      let parsePool = function (routes, groupTitle) {
        for (let index in routes) {
          if (!routes[index].meta || routes[index].meta.hidden) {
            continue;
          }
          let pool = {
            path: routes[index].path,
            title: groupTitle
              ? groupTitle + ">" + routes[index].meta.title
              : routes[index].meta.title,
          };
          if (routes[index].meta.group) {
            parsePool(routes[index].children, pool.title);
          } else {
            pools.push(pool);
          }
        }
      };
      parsePool(routes);
      return pools;
    },
    searchRemote(query) {
      if (query !== "") {
        this.searchOptions = this.fuse.search(query);
      } else {
        this.searchOptions = [];
      }
    },

    selectedSearch(path) {
      if (path !== this.$route.path) {
        this.$router.push(path);
      }
      this.searchValue = "";
      this.searchOptions = [];
    },
  },
  mounted() {
    this.searchPool = this.generatePool(this.$router.options.routes);
  },
};
</script>

<style scoped lang="less">
.header-search {
  .icon-search {
    vertical-align: middle;
    color: #304156;
    cursor: pointer;
    font-weight: bold;
  }

  ::v-deep .el-input__inner {
    border: none;
    border-bottom: 1px solid #dcdcdc;
    border-radius: unset;
  }

  ::v-deep .el-input.is-focus .el-input__inner {
    border-color: #dcdcdc;
  }

  ::v-deep .el-select .el-input__inner:focus {
    border-color: #dcdcdc;
  }
}
</style>

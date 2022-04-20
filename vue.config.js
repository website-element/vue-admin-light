const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    proxy: {
      [process.env.VUE_APP_API_BASE_URL]: {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_API_BASE_URL]: "",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@system", path.resolve(__dirname, "system"));
    config.plugin("html").tap((args) => {
      args[0].title = "Vue Admin";
      return args;
    });
  },
});

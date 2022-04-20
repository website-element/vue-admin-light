var ajaxUtils = require("../utils/ajaxUtils");

var fs = require("fs");

/**
 * Load API
 * @param {Express} app - Express app
 */
var load = function (app) {
  /**
   * Login
   */
  app.post("/system/login", (req, res) => {
    // Mock token
    ajaxUtils.sendSucceed(res, "0123456789");
  });

  /**
   * Get login info
   */
  app.get("/system/getInfo", (req, res) => {
    // Mock login info
    let loginInfo = {
      sysUser: {
        username: "admin",
        nickname: "Administrator",
      },
    };
    ajaxUtils.sendSucceed(res, loginInfo);
  });

  /**
   * Get router
   */
  app.get("/system/getRouter", (req, res) => {
    // Mock router data
    fs.readFile("./data/router.json", "utf-8", function (error, data) {
      if (error) {
        ajaxUtils.sendFailed(res, 500, error);
        return;
      }
      ajaxUtils.sendSucceed(res, JSON.parse(data));
    });
  });

  /**
   * Logout
   */
  app.delete("/system/logout", (req, res) => {
    ajaxUtils.sendSucceed(res);
  });
};

module.exports = load;

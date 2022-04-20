var ajaxUtils = require("../utils/ajaxUtils");

/**
 * A interceptor for authentication
 * @param {Request} req - Request
 * @param {Response} res - Response
 * @param {Function} next - Next function
 */
var AuthenticationInterceptor = function (req, res, next) {
  const WhiteList = ["/system/login"];
  if (
    req.headers.authorization !== "0123456789" &&
    WhiteList.indexOf(req.baseUrl) < 0
  ) {
    ajaxUtils.sendFailed(
      res,
      ajaxUtils.BusinessCode.invalidAuthentication,
      "Login invalid"
    );
    return;
  }
  next();
};

module.exports = AuthenticationInterceptor;

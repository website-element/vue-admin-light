/**
 * Send ajax data for succeed
 * @param {Request} res  - Request
 * @param {any} data -  send data
 */

/** Business code */
var BusinessCode = {
  succeed: 0,
  failed: 500,
  invalidAuthentication: 401,
};

function sendSucceed(res, data) {
  res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  let result = {
    code: BusinessCode.succeed,
    msg: "success",
    data: data,
  };
  res.end(JSON.stringify(result));
}

/**
 * Send ajax data for failed
 * @param {Request} res - Request
 * @param {number} code - Business status code
 * @param {string} msg - Error message
 */
function sendFailed(res, code, msg) {
  res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
  let result = {
    code: code,
    msg: msg,
  };
  res.end(JSON.stringify(result));
}

module.exports = {
  BusinessCode,
  sendSucceed,
  sendFailed,
};

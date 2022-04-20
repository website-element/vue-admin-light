var express = require("express");
var app = express();

/** Use authenticationi interceptor */
var AuthenticationInterceptor = require("./interceptor/AuthenticationInterceptor");
app.use("*", AuthenticationInterceptor);

/** Use controller modules */
var loadLoginAPI = require("./controller/loginController");
loadLoginAPI(app);

var server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Server running at: http://%s:%s", host, port);
});

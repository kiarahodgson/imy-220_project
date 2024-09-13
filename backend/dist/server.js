"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use(_express["default"]["static"]("frontend/public"));
app.get('*', function (req, res) {
  res.sendFile(_path["default"].resolve("frontend/public", "index.html"));
});
app.listen(process.env.PORT, function () {
  console.log("Server is running on http://localhost:".concat(process.env.PORT));
});
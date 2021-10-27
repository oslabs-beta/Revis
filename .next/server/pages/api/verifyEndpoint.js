"use strict";
(() => {
var exports = {};
exports.id = 633;
exports.ids = [633];
exports.modules = {

/***/ 5075:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Redis = __webpack_require__(6933);

const verifyEndpoint = async (req, res) => {
  const {
    method
  } = req;
  let redis;

  switch (method) {
    case 'POST':
      try {
        const parsedBody = JSON.parse(req.body);
        const {
          endpoint,
          password,
          port
        } = parsedBody;
        if (!(endpoint && password && port)) throw Error('Endpoint, password, and port required.');
        redis = await new Redis({
          host: endpoint,
          port,
          password,
          maxRetriesPerRequest: 0,
          lazyConnect: true,
          connectTimeOut: 1,
          disconnectTimeOut: 1
        });
        await redis.ping();
        await redis.disconnect();
        return res.status(200).json({
          success: true
        });
      } catch (err) {
        await redis.disconnect();
        console.log(err);
        return res.status(400).json({
          success: false,
          error: err
        });
      }

    default:
      return res.status(400).json({
        error: 'Error within verifyEndpoint'
      });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (verifyEndpoint);

/***/ }),

/***/ 6933:
/***/ ((module) => {

module.exports = require("ioredis");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5075));
module.exports = __webpack_exports__;

})();
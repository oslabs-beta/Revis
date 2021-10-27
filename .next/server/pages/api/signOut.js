"use strict";
(() => {
var exports = {};
exports.id = 156;
exports.ids = [156];
exports.modules = {

/***/ 5614:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9038);
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookies__WEBPACK_IMPORTED_MODULE_0__);


const signOut = async (req, res) => {
  const cookies = new (cookies__WEBPACK_IMPORTED_MODULE_0___default())(req, res);
  cookies.set('username', null);
  cookies.set('ssid', null);
  cookies.set('session', null);
  cookies.set('serverID', null);
  cookies.set('previouslyCalled', null);
  cookies.set('lastCalled', null);
  return res.status(200).json({
    success: true
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (signOut);

/***/ }),

/***/ 9038:
/***/ ((module) => {

module.exports = require("cookies");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5614));
module.exports = __webpack_exports__;

})();
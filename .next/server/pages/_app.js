(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2058:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: external "next-themes"
const external_next_themes_namespaceObject = require("next-themes");
// EXTERNAL MODULE: ./src/context/Provider.tsx + 22 modules
var Provider = __webpack_require__(1227);
// EXTERNAL MODULE: ./src/styles/DarkModeToggleSwitch.module.scss
var DarkModeToggleSwitch_module = __webpack_require__(8504);
var DarkModeToggleSwitch_module_default = /*#__PURE__*/__webpack_require__.n(DarkModeToggleSwitch_module);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/components/Globals/DarkModeToggle.tsx





function DarkModeToggle() {
  const {
    theme,
    setTheme
  } = (0,external_next_themes_namespaceObject.useTheme)();
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
      className: (DarkModeToggleSwitch_module_default()).switch,
      children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
        type: "checkbox",
        id: "darkMode",
        defaultChecked: theme !== 'light',
        onClick: () => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }
      }), /*#__PURE__*/jsx_runtime_.jsx("span", {
        className: (DarkModeToggleSwitch_module_default()).slider
      })]
    })
  });
}
;// CONCATENATED MODULE: ./src/pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "general",
    children: /*#__PURE__*/jsx_runtime_.jsx(Provider/* GlobalProvider */.R, {
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_next_themes_namespaceObject.ThemeProvider, {
        enableSystem: false,
        children: [/*#__PURE__*/jsx_runtime_.jsx(DarkModeToggle, {}), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))]
      })
    })
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 8504:
/***/ ((module) => {

// Exports
module.exports = {
	"switch": "DarkModeToggleSwitch_switch__ca6Gv",
	"slider": "DarkModeToggleSwitch_slider__Me49b"
};


/***/ }),

/***/ 9297:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [227], () => (__webpack_exec__(2058)));
module.exports = __webpack_exports__;

})();
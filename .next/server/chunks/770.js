exports.id = 770;
exports.ids = [770];
exports.modules = {

/***/ 3422:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_Provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1227);
/* harmony import */ var _styles_UpdateInterval_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5256);
/* harmony import */ var _styles_UpdateInterval_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_UpdateInterval_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);






function UpdateInterval() {
  const {
    metricsStore,
    graphInterval,
    currentServer
  } = (0,_context_Provider__WEBPACK_IMPORTED_MODULE_1__/* .useStore */ .oR)();
  const time = graphInterval.updateInterval.interval;
  const placeholder = graphInterval.updateInterval.interval / 1000;
  const {
    selectedServer
  } = currentServer;
  const {
    endpoint,
    password,
    port
  } = selectedServer;
  const {
    0: render,
    1: reRender
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    metricState,
    metricsDispatch
  } = metricsStore;

  async function fetchDataFromRedis() {
    const response = await fetch('/api/redis', {
      method: 'POST',
      body: JSON.stringify({
        endpoint: `${endpoint}`,
        password: `${password}`,
        port: `${port}`
      })
    });
    const {
      metricsUpdated
    } = await response.json();
    metricsDispatch({
      type: 'updateMetrics',
      message: metricsUpdated
    });
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (endpoint === '' || password === '' || port === '') return;

    if (selectedServer.name !== undefined) {
      const interval = setInterval(fetchDataFromRedis, time);
      if (graphInterval.updateInterval.update === false) clearInterval(interval);
      return () => {
        clearInterval(interval);
      };
    }
  }, [selectedServer, render]);

  const change = () => {
    graphInterval.updateIntervalDispatch({
      type: 'toggleInterval',
      message: !graphInterval.updateInterval.update
    });
    reRender(!render);
  };

  const updateInterval = () => {
    const newInterval = document.getElementById('intervalInput');
    if (newInterval.value <= 0) newInterval.value = 1;
    graphInterval.updateIntervalDispatch({
      type: 'updateInterval',
      message: newInterval.value
    });
    newInterval.value = '';
    reRender(!render);
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    id: "intervalMenu",
    className: (_styles_UpdateInterval_module_scss__WEBPACK_IMPORTED_MODULE_3___default().underDashboard),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: (_styles_UpdateInterval_module_scss__WEBPACK_IMPORTED_MODULE_3___default().textAndSwitch),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: (_styles_UpdateInterval_module_scss__WEBPACK_IMPORTED_MODULE_3___default().intervalInput),
        children: ["Update interval in seconds:", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("input", {
          id: "intervalInput",
          type: "number",
          placeholder: placeholder
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
          type: "button",
          onClick: updateInterval,
          children: "Update"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("label", {
        className: (_styles_UpdateInterval_module_scss__WEBPACK_IMPORTED_MODULE_3___default().switch),
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("input", {
          checked: graphInterval.updateInterval.update,
          type: "checkbox",
          onChange: change
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
          className: (_styles_UpdateInterval_module_scss__WEBPACK_IMPORTED_MODULE_3___default().slider)
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("p", {
        children: "Automatic Updates"
      })]
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UpdateInterval);

/***/ }),

/***/ 9589:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context_Provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1227);
/* harmony import */ var _styles_Welcome_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5468);
/* harmony import */ var _styles_Welcome_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Welcome_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);






function Welcome() {
  const {
    user
  } = (0,_context_Provider__WEBPACK_IMPORTED_MODULE_1__/* .useStore */ .oR)();
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    className: (_styles_Welcome_module_scss__WEBPACK_IMPORTED_MODULE_3___default().Welcome),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h4", {
      children: ["Welcome ", user.userState.username, "!"]
    })
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Welcome);

/***/ }),

/***/ 912:
/***/ ((module) => {

// Exports
module.exports = {
	"GraphContainer": "GraphContainer_GraphContainer__4m94F",
	"LeftMenu": "GraphContainer_LeftMenu__1s1eE",
	"GraphFlex": "GraphContainer_GraphFlex__18YZ-",
	"Graph": "GraphContainer_Graph__2Sa7_",
	"MultipleGraphContainer": "GraphContainer_MultipleGraphContainer__WostB",
	"LeftMetrics": "GraphContainer_LeftMetrics__1XmrM",
	"MaxGraphsMessage": "GraphContainer_MaxGraphsMessage__2-Yo3",
	"metrics": "GraphContainer_metrics__qxzfu",
	"emptySquare": "GraphContainer_emptySquare__2zMpw",
	"fullSquare": "GraphContainer_fullSquare__1L6jG"
};


/***/ }),

/***/ 5256:
/***/ ((module) => {

// Exports
module.exports = {
	"underDashboard": "UpdateInterval_underDashboard__2TMiz",
	"textAndSwitch": "UpdateInterval_textAndSwitch__n71Rh",
	"switch": "UpdateInterval_switch__380yZ",
	"slider": "UpdateInterval_slider__GOiN-",
	"intervalInput": "UpdateInterval_intervalInput__2HNTI"
};


/***/ }),

/***/ 5468:
/***/ ((module) => {

// Exports
module.exports = {
	"Welcome": "Welcome_Welcome__1U63I"
};


/***/ })

};
;
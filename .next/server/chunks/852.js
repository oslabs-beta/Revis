"use strict";
exports.id = 852;
exports.ids = [852];
exports.modules = {

/***/ 6852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Multiple_MultipleGraphContainer)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./src/context/Provider.tsx + 22 modules
var Provider = __webpack_require__(1227);
// EXTERNAL MODULE: external "recharts"
var external_recharts_ = __webpack_require__(7847);
// EXTERNAL MODULE: ./src/styles/GraphContainer.module.scss
var GraphContainer_module = __webpack_require__(912);
var GraphContainer_module_default = /*#__PURE__*/__webpack_require__.n(GraphContainer_module);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/components/Graphs/Multiple/MultipleGraph.tsx






function MultipleGraph({
  metricName,
  metricValue
}) {
  const cleanNames = string => {
    const splitNames = string.split('_');
    const capitilizeFirstLetter = splitNames.map(str => {
      const firstLetter = str[0].toUpperCase();
      return firstLetter + str.slice(1) + ' ';
    });
    return capitilizeFirstLetter;
  };

  const graphWidth = () => window.innerWidth / 5;

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("h1", {
      children: cleanNames(metricName)
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (GraphContainer_module_default()).Graph,
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_recharts_.LineChart, {
        width: graphWidth(),
        height: 300,
        data: metricValue,
        margin: {
          top: 30,
          right: 20,
          bottom: 25,
          left: 20
        },
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_recharts_.Line, {
          type: "monotone",
          dataKey: metricName,
          stroke: "#e38d41e9"
        }), /*#__PURE__*/jsx_runtime_.jsx(external_recharts_.XAxis, {
          stroke: "#e38d41e9",
          dataKey: "time",
          tick: {
            fill: '#d8d8d4'
          }
        }), /*#__PURE__*/jsx_runtime_.jsx(external_recharts_.YAxis, {
          stroke: "#e38d41e9",
          tick: {
            fill: '#d8d8d4'
          }
        }), /*#__PURE__*/jsx_runtime_.jsx(external_recharts_.Tooltip, {})]
      })
    })]
  });
}

/* harmony default export */ const Multiple_MultipleGraph = (MultipleGraph);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(799);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(887);
;// CONCATENATED MODULE: ./src/components/Graphs/Multiple/MetricsForGraph.tsx








function MetricsForGraph({
  metricName
}) {
  const {
    multipleGraphSelections
  } = (0,Provider/* useStore */.oR)();

  const cleanNames = string => {
    const splitNames = string.split('_');
    const capitilizeFirstLetter = splitNames.map(str => {
      const firstLetter = str[0].toUpperCase();
      return firstLetter + str.slice(1) + ' ';
    });
    return capitilizeFirstLetter;
  };

  const changeMetric = () => {
    if (multipleGraphSelections.multipleGraphState[metricName]) {
      multipleGraphSelections.multipleGraphDispatch({
        type: 'metricUnselected',
        message: metricName
      });
    } else {
      if (Object.keys(multipleGraphSelections.multipleGraphState).length > 3) {
        return;
      }

      multipleGraphSelections.multipleGraphDispatch({
        type: 'newMetricSelected',
        message: metricName
      });
    }
  };

  const squareUnChecked = /*#__PURE__*/jsx_runtime_.jsx("span", {
    onClick: changeMetric,
    children: /*#__PURE__*/jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
      id: metricName,
      icon: free_solid_svg_icons_.faSquare,
      className: (GraphContainer_module_default()).emptySquare
    })
  }, metricName);

  const squareChecked = /*#__PURE__*/jsx_runtime_.jsx("span", {
    onClick: changeMetric,
    children: /*#__PURE__*/jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
      id: metricName,
      icon: free_solid_svg_icons_.faCheckSquare,
      className: (GraphContainer_module_default()).fullSquare
    })
  }, metricName);

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (GraphContainer_module_default()).metrics,
    children: [multipleGraphSelections.multipleGraphState[metricName] ? squareChecked : squareUnChecked, cleanNames(metricName)]
  });
}

/* harmony default export */ const Multiple_MetricsForGraph = (MetricsForGraph);
;// CONCATENATED MODULE: ./src/components/Graphs/Multiple/LeftMenuOfGraph.tsx







function LeftMenuOfGraph() {
  const {
    metricsStore,
    multipleGraphSelections
  } = (0,Provider/* useStore */.oR)();
  const metricsForCheckBoxes = [];

  if (Object.keys(metricsStore.metricState).length !== 0) {
    Object.entries(metricsStore.metricState[0]).forEach(el => {
      if (el[0] !== 'time') metricsForCheckBoxes.push( /*#__PURE__*/jsx_runtime_.jsx(Multiple_MetricsForGraph, {
        metricName: el[0]
      }));
    });
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    id: "leftMenuGraphs",
    className: (GraphContainer_module_default()).LeftMenu,
    children: [Object.keys(multipleGraphSelections.multipleGraphState).length > 3 ? /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (GraphContainer_module_default()).MaxGraphsMessage,
      children: "Only 4 graphs can be simultaneously displayed"
    }) : '', /*#__PURE__*/jsx_runtime_.jsx("div", {
      id: "leftMenuGraphs",
      className: (GraphContainer_module_default()).LeftMenu,
      children: metricsForCheckBoxes
    })]
  });
}

/* harmony default export */ const Multiple_LeftMenuOfGraph = (LeftMenuOfGraph);
// EXTERNAL MODULE: ./src/components/Globals/UpdateInterval.tsx
var UpdateInterval = __webpack_require__(3422);
;// CONCATENATED MODULE: ./src/components/Graphs/Multiple/MultipleGraphContainer.tsx









function MultipleGraphContainer() {
  const {
    multipleGraphSelections,
    metricsStore
  } = (0,Provider/* useStore */.oR)();
  const arrayWithGraphs = [];
  const data = metricsStore.metricState;
  let i = 0;
  Object.keys(multipleGraphSelections.multipleGraphState).forEach(key => {
    if (multipleGraphSelections.multipleGraphState[key]) {
      arrayWithGraphs.push( /*#__PURE__*/jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/jsx_runtime_.jsx(Multiple_MultipleGraph, {
          metricValue: data,
          metricName: key
        })
      }, i));
    }

    i += 1;
  });
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (GraphContainer_module_default()).MultipleGraphContainer,
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      children: /*#__PURE__*/jsx_runtime_.jsx(Multiple_LeftMenuOfGraph, {})
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (GraphContainer_module_default()).GraphFlex,
      children: arrayWithGraphs
    }), /*#__PURE__*/jsx_runtime_.jsx(UpdateInterval/* default */.Z, {})]
  });
}

/* harmony default export */ const Multiple_MultipleGraphContainer = (MultipleGraphContainer);

/***/ })

};
;
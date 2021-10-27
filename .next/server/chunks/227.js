"use strict";
exports.id = 227;
exports.ids = [227];
exports.modules = {

/***/ 1227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "R": () => (/* binding */ GlobalProvider),
  "oR": () => (/* binding */ useStore)
});

// UNUSED EXPORTS: GlobalContext

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateServers.tsx
const Servers = [];
/* harmony default export */ const initialStateServers = (Servers);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateMetrics.tsx
const metricsInitialState = [// {
  //   total_net_output_bytes: '0',
  //   used_memory: '0',
  //   connected_clients: '0',
  //   evicted_keys: '0',
  //   keyspace_hits: '0',
  //   keyspace_misses: '0',
  //   total_net_input_bytes: '0',
  //   uptime_in_seconds: '0',
  //   client_longest_output_list: '0',
  //   client_biggest_input_buf: '0',
  //   blocked_clients: '0',
  //   used_memory_rss: '0',
  //   used_memory_peak: '0',
  //   total_connections_received: '0',
  //   total_commands_processed: '0',
  //   instantaneous_ops_per_sec: '0',
  //   instantaneous_input_kbps: '0',
  //   instantaneous_output_kbps: '0',
  //   rejected_connections: '0',
  //   total_error_replies: '0',
  //   used_cpu_sys: '0',
  //   used_cpu_user: '0',
  //   used_cpu_sys_children: '0',
  //   used_cpu_user_children: '0',
  //   used_cpu_sys_main_thread: '0',
  //   used_cpu_user_main_thread: '0',
  // },
];
/* harmony default export */ const initialStateMetrics = (metricsInitialState);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateUser.tsx
const user = {
  username: ''
};
/* harmony default export */ const initialStateUser = (user);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateSelectedMetric.tsx
const selectedMetric = '';
/* harmony default export */ const initialStateSelectedMetric = (selectedMetric);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateOfMultipleGraphs.tsx
const metricsBeingCompared = {};
/* harmony default export */ const initialStateOfMultipleGraphs = (metricsBeingCompared);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateTheme.tsx
const theme = {
  light: false
};
/* harmony default export */ const initialStateTheme = (theme);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateUpdateInterval.tsx
const interval = {
  update: true,
  interval: 10000
};
/* harmony default export */ const initialStateUpdateInterval = (interval);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateSelectedServer.tsx
const selectedServer = {
  name: '',
  endpoint: '',
  password: '',
  port: '',
  sessionToken: ''
};
/* harmony default export */ const initialStateSelectedServer = (selectedServer);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateMetricHistory.tsx
const MetricHistory = [];
/* harmony default export */ const initialStateMetricHistory = (MetricHistory);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateOfDatesForHistory.tsx
const datesBeingCompared = {};
/* harmony default export */ const initialStateOfDatesForHistory = (datesBeingCompared);
;// CONCATENATED MODULE: ./src/context/initialStates/initialStateCustomMetrics.ts
const customMetrics = {
  total_net_output_bytes: '',
  used_memory: '',
  connected_clients: '',
  evicted_keys: '',
  keyspace_hits: '',
  keyspace_misses: '',
  total_net_input_bytes: '',
  uptime_in_seconds: ''
};
/* harmony default export */ const initialStateCustomMetrics = (customMetrics);
;// CONCATENATED MODULE: ./src/context/reducers/user.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const user_user = (state, action) => {
  switch (action.type) {
    case 'updateUsername':
      {
        const username = action.message;
        return _objectSpread(_objectSpread({}, state), {}, {
          username
        });
      }

    default:
      return state;
  }
};

/* harmony default export */ const reducers_user = (user_user);
;// CONCATENATED MODULE: ./src/context/reducers/metrics.tsx
const metrics = (state, action) => {
  let metricsList;
  if (!metricsList) metricsList = state.slice(); // action.message.uptime_in_seconds = Number(
  //   action.message.uptime_in_seconds / 3600
  // ).toFixed(0);
  // action.message.used_memory = Number(
  //   action.message.used_memory * 1e-6
  // ).toFixed(2);
  // action.message.total_net_output_bytes = Number(
  //   action.message.total_net_output_bytes * 1e-6
  // ).toFixed(2);
  // action.message.total_net_input_bytes = Number(
  //   action.message.total_net_input_bytes * 1e-6
  // ).toFixed(2);

  switch (action.type) {
    case 'updateMetrics':
      metricsList.push(action.message);
      return metricsList;

    case 'cleanMetrics':
      if (Array.isArray(action.message.metricsUpdated)) {
        return [...action.message.metricsUpdated];
      }

      return [action.message.metricsUpdated];

    default:
      return state;
  }
};

/* harmony default export */ const reducers_metrics = (metrics);
;// CONCATENATED MODULE: ./src/context/reducers/servers.tsx
const deleteServerFromDataBase = name => {
  fetch('/api/servers', {
    method: 'DELETE',
    body: JSON.stringify({
      name
    }),
    'Content-Type': 'application/json'
  });
};

const postServerToDataBase = (name, endpoint, port, username, password) => {
  fetch('/api/servers', {
    method: 'POST',
    body: JSON.stringify({
      name,
      endpoint,
      port,
      username,
      password
    }),
    'Content-Type': 'application/json'
  });
};

const servers = (state, action) => {
  const server = action.message;
  const newServerList = state.slice();

  switch (action.type) {
    case 'addServer':
      {
        newServerList.push(server);
        postServerToDataBase(server.name, server.endpoint, server.port, server.username, server.password);
        return newServerList;
      }

    case 'deleteServer':
      {
        if (!server) return state;
        deleteServerFromDataBase(server.name);
        return newServerList.filter(elem => elem.name !== server.name);
      }

    case 'populateList':
      {
        if (!newServerList.includes(server)) return newServerList.concat(server);
        return newServerList;
      }

    default:
      return state;
  }
};

/* harmony default export */ const reducers_servers = (servers);
;// CONCATENATED MODULE: ./src/context/reducers/selectedMetric.tsx
const selectedMetric_selectedMetric = (state, action) => {
  switch (action.type) {
    case 'updateSelectedMetric':
      {
        const newSelectedMetric = action.message;
        return newSelectedMetric;
      }

    default:
      return state;
  }
};

/* harmony default export */ const reducers_selectedMetric = (selectedMetric_selectedMetric);
;// CONCATENATED MODULE: ./src/context/reducers/metricsBeingCompared.tsx
function metricsBeingCompared_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function metricsBeingCompared_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { metricsBeingCompared_ownKeys(Object(source), true).forEach(function (key) { metricsBeingCompared_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { metricsBeingCompared_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function metricsBeingCompared_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const metricsBeingCompared_metricsBeingCompared = (state, action) => {
  const newMetricsSelected = action.message;

  const metricsSelectedObject = metricsBeingCompared_objectSpread({}, state);

  switch (action.type) {
    case "newMetricSelected":
      {
        metricsSelectedObject[newMetricsSelected] = true;
        return metricsSelectedObject;
      }

    case "metricUnselected":
      {
        delete metricsSelectedObject[newMetricsSelected];
        return metricsSelectedObject;
      }

    default:
      return state;
  }
};

/* harmony default export */ const reducers_metricsBeingCompared = (metricsBeingCompared_metricsBeingCompared);
;// CONCATENATED MODULE: ./src/context/reducers/theme.tsx
function theme_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function theme_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { theme_ownKeys(Object(source), true).forEach(function (key) { theme_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { theme_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function theme_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const theme_theme = (state, action) => theme_objectSpread(theme_objectSpread({}, state), {}, {
  light: !action.message
});

/* harmony default export */ const reducers_theme = (theme_theme);
;// CONCATENATED MODULE: ./src/context/reducers/currentServer.tsx
function currentServer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function currentServer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { currentServer_ownKeys(Object(source), true).forEach(function (key) { currentServer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { currentServer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function currentServer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const currentServer = (state, action) => {
  const currentInfo = action.message;
  const newServer = state;
  const {
    name,
    endpoint,
    port,
    password
  } = currentInfo;

  switch (action.type) {
    case 'currentServer':
      return currentServer_objectSpread(currentServer_objectSpread({}, newServer), {}, {
        name,
        endpoint,
        port,
        password
      });

    default:
      return state;
  }
};

/* harmony default export */ const reducers_currentServer = (currentServer);
;// CONCATENATED MODULE: ./src/context/reducers/interval.tsx
function interval_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function interval_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { interval_ownKeys(Object(source), true).forEach(function (key) { interval_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { interval_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function interval_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const interval_interval = (state, action) => {
  const updatedInterval = interval_objectSpread({}, state);

  switch (action.type) {
    case 'updateInterval':
      {
        updatedInterval.interval = Number(action.message) * 1000;
        return updatedInterval;
      }

    case 'toggleInterval':
      {
        updatedInterval.update = action.message;
        return updatedInterval;
      }

    default:
      return state;
  }
};

/* harmony default export */ const reducers_interval = (interval_interval);
;// CONCATENATED MODULE: ./src/context/reducers/metricHistory.tsx
const metricHistory_deleteServerFromDataBase = name => {
  fetch('/api/servers', {
    method: 'DELETE',
    body: JSON.stringify({
      name
    }),
    'Content-Type': 'application/json'
  });
};

const metricHistory_postServerToDataBase = (name, endpoint, port, username, password) => {
  fetch('/api/servers', {
    method: 'POST',
    body: JSON.stringify({
      name,
      endpoint,
      port,
      username,
      password
    }),
    'Content-Type': 'application/json'
  });
};

const metricHistory = (state, action) => {
  const server = action.message;

  switch (action.type) {
    case 'addServer':
      return server;

    case 'deleteServer':
      return {};
    // case 'populateList': {
    // }

    default:
      return state;
  }
};

/* harmony default export */ const reducers_metricHistory = (metricHistory);
;// CONCATENATED MODULE: ./src/context/reducers/datesBeingCompared.tsx
function datesBeingCompared_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function datesBeingCompared_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { datesBeingCompared_ownKeys(Object(source), true).forEach(function (key) { datesBeingCompared_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { datesBeingCompared_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function datesBeingCompared_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const datesBeingCompared_datesBeingCompared = (state, action) => {
  const newDateSelected = action.message;

  const datesSelectedObject = datesBeingCompared_objectSpread({}, state);

  switch (action.type) {
    case 'newDateSelected':
      {
        datesSelectedObject[newDateSelected] = [];
        return datesSelectedObject;
      }

    case 'dateUnselected':
      {
        delete datesSelectedObject[newDateSelected];
        return datesSelectedObject;
      }

    default:
      return state;
  }
};

/* harmony default export */ const reducers_datesBeingCompared = (datesBeingCompared_datesBeingCompared);
;// CONCATENATED MODULE: ./src/context/reducers/customMetrics.tsx
function customMetrics_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function customMetrics_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { customMetrics_ownKeys(Object(source), true).forEach(function (key) { customMetrics_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { customMetrics_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function customMetrics_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const customMetrics_customMetrics = (state, action) => {
  const updatedMetrics = customMetrics_objectSpread({}, state);

  const {
    deletedMetric,
    updatedMetric
  } = action.message;

  switch (action.type) {
    case 'changeMetric':
      {
        updatedMetrics[updatedMetric] = '';
        delete updatedMetrics[deletedMetric];
        return updatedMetrics;
      }

    default:
      return state;
  }
};

/* harmony default export */ const reducers_customMetrics = (customMetrics_customMetrics);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/context/Provider.tsx
























const GlobalContext = /*#__PURE__*/(0,external_react_.createContext)({}); // the provider needs to fill the state

const GlobalProvider = ({
  children
}) => {
  const {
    0: userState,
    1: userDispatch
  } = (0,external_react_.useReducer)(reducers_user, initialStateUser);
  const {
    0: metricState,
    1: metricsDispatch
  } = (0,external_react_.useReducer)(reducers_metrics, initialStateMetrics);
  const {
    0: serverList,
    1: serversDispatch
  } = (0,external_react_.useReducer)(reducers_servers, initialStateServers);
  const {
    0: metricToGraph,
    1: selectedMetricDispatch
  } = (0,external_react_.useReducer)(reducers_selectedMetric, initialStateSelectedMetric);
  const {
    0: multipleGraphState,
    1: multipleGraphDispatch
  } = (0,external_react_.useReducer)(reducers_metricsBeingCompared, initialStateOfMultipleGraphs);
  const {
    0: currentTheme,
    1: themeDispatch
  } = (0,external_react_.useReducer)(reducers_theme, initialStateTheme);
  const {
    0: selectedServer,
    1: selectedServerDispatch
  } = (0,external_react_.useReducer)(reducers_currentServer, initialStateSelectedServer);
  const {
    0: updateInterval,
    1: updateIntervalDispatch
  } = (0,external_react_.useReducer)(reducers_interval, initialStateUpdateInterval);
  const {
    0: metricHistoryState,
    1: metricHistoryDispatch
  } = (0,external_react_.useReducer)(reducers_metricHistory, initialStateMetricHistory);
  const {
    0: datesSelectedState,
    1: datesSelectedDispatch
  } = (0,external_react_.useReducer)(reducers_datesBeingCompared, initialStateOfDatesForHistory);
  const {
    0: customMetricState,
    1: customMetricDispatch
  } = (0,external_react_.useReducer)(reducers_customMetrics, initialStateCustomMetrics);
  return /*#__PURE__*/jsx_runtime_.jsx(GlobalContext.Provider, {
    value: {
      user: {
        userState,
        userDispatch
      },
      metricsStore: {
        metricState,
        metricsDispatch
      },
      servers: {
        serverList,
        serversDispatch
      },
      currentServer: {
        selectedServer,
        selectedServerDispatch
      },
      metricToGraph: {
        metricToGraph,
        selectedMetricDispatch
      },
      multipleGraphSelections: {
        multipleGraphState,
        multipleGraphDispatch
      },
      themeContext: {
        currentTheme,
        themeDispatch
      },
      graphInterval: {
        updateInterval,
        updateIntervalDispatch
      },
      metricHistory: {
        metricHistoryState,
        metricHistoryDispatch
      },
      datesSelected: {
        datesSelectedState,
        datesSelectedDispatch
      },
      customMetrics: {
        customMetricState,
        customMetricDispatch
      }
    },
    children: children
  });
};
const useStore = () => (0,external_react_.useContext)(GlobalContext);

/***/ })

};
;
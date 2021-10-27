"use strict";
(() => {
var exports = {};
exports.id = 709;
exports.ids = [709];
exports.modules = {

/***/ 921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Redis = __webpack_require__(6933);

const redisAPI = async (req, res) => {
  // this object is for the front end:
  const metricsUpdated = {
    time: '',
    total_net_output_bytes: '',
    used_memory: '',
    connected_clients: '',
    evicted_keys: '',
    keyspace_hits: '',
    keyspace_misses: '',
    total_net_input_bytes: '',
    uptime_in_seconds: '',
    client_longest_output_list: '',
    client_biggest_input_buf: '',
    blocked_clients: '',
    used_memory_rss: '',
    used_memory_peak: '',
    total_connections_received: '',
    total_commands_processed: '',
    instantaneous_ops_per_sec: '',
    instantaneous_input_kbps: '',
    instantaneous_output_kbps: '',
    rejected_connections: '',
    total_error_replies: '',
    used_cpu_sys: '',
    used_cpu_user: '',
    used_cpu_sys_children: '',
    used_cpu_user_children: '',
    used_cpu_sys_main_thread: '',
    used_cpu_user_main_thread: ''
  };
  const {
    method
  } = req;

  switch (method) {
    case 'POST':
      try {
        const parsedBody = JSON.parse(req.body);
        const {
          endpoint,
          password,
          port
        } = parsedBody;
        const redis = new Redis({
          host: endpoint,
          port,
          password,
          connectTimeout: 10000,
          reconnectOnError: false
        });
        const metrics = await redis.info();
        const splitMetrics = metrics.split('\r\n');
        const today = new Date();
        const updatedSeconds = today.getSeconds().toString().length === 1 ? `0${today.getSeconds()}` : today.getSeconds();
        const updatedMinutes = today.getMinutes().toString().length === 1 ? `0${today.getMinutes()}` : today.getMinutes();
        const updatedHours = today.getHours().toString().length === 1 ? `0${today.getHours()}` : today.getHours();
        const time = `${updatedHours}-${updatedMinutes}-${updatedSeconds}`;
        splitMetrics[splitMetrics.length] = `time: ${time}`;
        splitMetrics.forEach(currentMetric => {
          // we split it again to find the keys and values of each line
          // currentMetric format example:
          // 'used_memory:572856'
          let [metricName, metricValue] = currentMetric.split(':');

          if (metricValue !== undefined) {
            if (metricName in metricsUpdated) {
              if (metricName === 'time') {
                metricValue = metricValue.replace(/-/g, ':').trim();
              }

              metricsUpdated[metricName] = metricValue;
            }
          }
        });
        redis.quit();
        return res.status(200).json({
          metricsUpdated
        });
      } catch (err) {
        return res.status(400).send('Unable to get metrics from Redis server');
      }

    default:
      return res.status(400).send('Error in Endpoint');
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (redisAPI);

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
var __webpack_exports__ = (__webpack_exec__(921));
module.exports = __webpack_exports__;

})();
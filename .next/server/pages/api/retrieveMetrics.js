(() => {
var exports = {};
exports.id = 239;
exports.ids = [239];
exports.modules = {

/***/ 227:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  Pool
} = __webpack_require__(4723);

const config = {};

if (false) {} else if (true) {
  config.user = process.env.RDS_USERNAME;
  config.database = process.env.RDS_DB_NAME;
  config.password = process.env.RDS_PASSWORD;
  config.host = process.env.RDS_HOSTNAME;
  config.port = process.env.RDS_PORT;
}

const pool = new Pool(config);
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

/***/ }),

/***/ 2736:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9038);
/* harmony import */ var cookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookies__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_Revis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(227);
/* harmony import */ var _models_Revis__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_models_Revis__WEBPACK_IMPORTED_MODULE_1__);



const Redis = __webpack_require__(6933);

const monthToNum = {
  Jan: '1',
  Feb: '2',
  Mar: '3',
  Apr: '4',
  May: '5',
  Jun: '6',
  Jul: '7',
  Aug: '8',
  Sep: '9',
  Oct: '10',
  Nov: '11',
  Dec: '12'
};

const storeMetrics = async (req, res) => {
  const {
    method
  } = req;
  const cookies = new (cookies__WEBPACK_IMPORTED_MODULE_0___default())(req, res);
  const userID = Number(cookies.get('ssid'));
  const today = new Date();
  const day = String(today.getDate());
  const month = String(today.getMonth() + 1);
  const year = String(today.getFullYear());

  switch (method) {
    case 'GET':
      {
        const serverID = Number(cookies.get('serverID'));
        const lastCalled = cookies.get('lastCalled');
        const previouslyCalled = cookies.get('previouslyCalled') === 'true';
        const [monthCookie, dayCookie, yearCookie] = lastCalled.split(' ').slice(1, 4);
        const dateCheck = day === dayCookie && month === monthToNum[monthCookie] && year === yearCookie;

        if (previouslyCalled && dateCheck) {
          const SQLQuery = `SELECT name,value FROM ${"metrics"} WHERE
        user_id = ${userID} AND server_id = ${serverID} AND date = CURRENT_DATE;`;
          const {
            rows
          } = await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLQuery);
          const numOfValues = rows[0].value.length;
          const metricsUpdated = [];

          for (let i = 0; i < numOfValues; i++) {
            const currentObj = {};
            rows.forEach(metric => {
              if (metric.value[i] === undefined) metric.value[i] = '';
              currentObj[metric.name] = metric.value[i];
            });
            metricsUpdated.push(currentObj);
          }

          return res.status(200).json({
            success: true,
            metricsUpdated
          });
        }

        return res.status(200).json({
          success: false
        });
      }

    case 'POST':
      {
        const parsedBody = JSON.parse(req.body);
        const {
          endpoint,
          date,
          metric
        } = parsedBody;
        const reformattedMetricName = metric.trim().replace(/[' ']/g, '_').toLowerCase();
        const redisStorageKey = `${endpoint}|${date}|${userID}|${reformattedMetricName}`;
        const redis = new Redis({
          host: "redis-10027.c238.us-central1-2.gce.cloud.redislabs.com",
          port: "10027",
          password: "91Ue9aQc1mReFlL36CGd3gK3wALASFxF",
          connectTimeout: 10000,
          reconnectOnError: false
        });
        const cachedMetrics = await redis.lrange(redisStorageKey, 0, -1);
        redis.quit();
        return res.status(200).json({
          cachedMetrics
        });
      }

    default:
      return res.status(400).json({
        error: 'Error within retrieveMetrics'
      });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storeMetrics);

/***/ }),

/***/ 9038:
/***/ ((module) => {

"use strict";
module.exports = require("cookies");

/***/ }),

/***/ 6933:
/***/ ((module) => {

"use strict";
module.exports = require("ioredis");

/***/ }),

/***/ 4723:
/***/ ((module) => {

"use strict";
module.exports = require("pg");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2736));
module.exports = __webpack_exports__;

})();
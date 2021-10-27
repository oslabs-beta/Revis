(() => {
var exports = {};
exports.id = 5;
exports.ids = [5];
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

/***/ 9363:
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

const storeMetrics = async (req, res) => {
  const {
    method
  } = req;
  const cookies = new (cookies__WEBPACK_IMPORTED_MODULE_0___default())(req, res);
  const userID = Number(cookies.get('ssid'));
  const serverID = Number(cookies.get('serverID'));
  const lastCalled = cookies.get('lastCalled');
  const previouslyCalled = cookies.get('previouslyCalled') === 'true';
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
  const numToMonth = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };
  const today = new Date();
  const day = String(today.getDate());
  const month = String(today.getMonth() + 1);
  const year = String(today.getFullYear());

  switch (method) {
    case 'GET':
      {
        const SQLQuery = `SELECT server_id,ta.name,tb.endpoint,value,date from "${"metrics"}" AS ta 
      INNER JOIN "${"serverCloud"}" as tb on tb.id =server_id where ta.user_id = ${userID} ORDER BY date`;
        const {
          rows
        } = await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLQuery);
        const redis = new Redis({
          host: "redis-10027.c238.us-central1-2.gce.cloud.redislabs.com",
          port: "10027",
          password: "91Ue9aQc1mReFlL36CGd3gK3wALASFxF",
          connectTimeout: 10000,
          reconnectOnError: false
        });
        const serversAndDates = {};
        const indexTracker = {};
        rows.forEach(async server => {
          // Organize data to send to front end
          const {
            endpoint,
            date,
            name,
            value
          } = server;
          const currentDay = `${date.getDate()}`;
          const currentMonth = numToMonth[`${date.getMonth() + 1}`];
          const currentYear = `${today.getFullYear()}`;
          const fullDate = `${currentMonth}-${currentDay}-${currentYear}`;

          if (!(endpoint in serversAndDates)) {
            serversAndDates[endpoint] = [];
            indexTracker[endpoint] = 0;
          }

          const currentArr = serversAndDates[endpoint];
          const currentIndex = indexTracker[endpoint];

          if (currentArr[currentIndex - 1] !== fullDate) {
            serversAndDates[endpoint].push(fullDate);
            indexTracker[endpoint] += 1;
          } // Store in Redis


          const redisStorageKey = `${endpoint}|${fullDate}|${userID}|${name}`;
          const existInRedis = await redis.lrange(redisStorageKey, 0, -1);

          if (existInRedis.length === 0) {
            await redis.rpush(redisStorageKey, value); // Tell keys to expire after five hours

            await redis.expire(redisStorageKey, 60 * 60 * 5);
          }
        });
        setTimeout(() => redis.quit(), 5000);
        return res.status(200).json({
          serversAndDates
        });
      }

    case 'POST':
      try {
        const [monthCookie, dayCookie, yearCookie] = lastCalled.split(' ').slice(1, 4);
        const dateCheck = day === dayCookie && month === monthToNum[monthCookie] && year === yearCookie;
        let SQLQuery = ''; // if (previouslyCalled && dateCheck) is true, then that means we have already
        // created set of columns for this server and we only have to update and not insert

        if (previouslyCalled && dateCheck) {
          SQLQuery = '';
          const parsedBody = JSON.parse(req.body);
          Object.entries(parsedBody).forEach(([metricName, metricValue]) => {
            SQLQuery += `UPDATE "${"metrics"}"
                SET value = ARRAY[${metricValue}] 
                WHERE 
                user_id = ${userID} AND
                server_id = ${serverID} AND 
                name = '${metricName}' AND
                date = CURRENT_DATE;
                 \n`;
          });
          await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLQuery);
        } else {
          SQLQuery = `
        INSERT INTO "${"metrics"}" (user_id,server_id,name,value) VALUES`;
          const parsedBody = JSON.parse(req.body);
          Object.entries(parsedBody).forEach(([metricName, metricValue], index) => {
            if (index < Object.keys(parsedBody).length - 1) {
              SQLQuery += `(${userID},${serverID},'${metricName}',
            ARRAY[${metricValue}]), \n`;
            } else {
              SQLQuery += `(${userID},${serverID},'${metricName}',
            ARRAY[${metricValue}]); \n`;
            }
          });
          SQLQuery += `UPDATE "${"serverCloud"}"
          SET lastcalled = CURRENT_DATE,
          previouslycalled = true
          WHERE id = ${serverID}
          RETURNING lastcalled;`;
          const result = await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLQuery);
          const {
            rows
          } = result[1];
          const {
            lastcalled
          } = rows[0];
          cookies.set('previouslyCalled', 'true');
          cookies.set('lastCalled', lastcalled);
        }

        return res.status(200).json({
          success: true
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          error: err
        });
      }

    default:
      return res.status(400).json({
        error: 'Error within storeMetrics'
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
var __webpack_exports__ = (__webpack_exec__(9363));
module.exports = __webpack_exports__;

})();
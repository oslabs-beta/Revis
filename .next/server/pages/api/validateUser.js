(() => {
var exports = {};
exports.id = 572;
exports.ids = [572];
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

/***/ 5892:
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



const bcrypt = __webpack_require__(2773);

const validateUser = async (req, res) => {
  const {
    method
  } = req;
  const cookies = new (cookies__WEBPACK_IMPORTED_MODULE_0___default())(req, res);
  const username = cookies.get('username');
  const userID = cookies.get('ssid');
  const SALT_WORK_FACTOR = 10;

  switch (method) {
    case 'GET':
      try {
        const ssid = cookies.get('ssid');
        return res.status(200).json({
          username,
          ssid
        });
      } catch (err) {
        return res.status(400).send('Error in validateUser');
      }

    case 'POST':
      try {
        const parsedBody = JSON.parse(req.body);
        const {
          endpoint
        } = parsedBody;
        const sessionCookie = cookies.get('session');
        if (!sessionCookie) throw Error('Invalid session token. Please log in to view servers.');
        const SQLquery = `SELECT id,lastcalled, ta.user_id, previouslycalled, tb.password as password 
        FROM "${"serverCloud"}" AS ta INNER JOIN "${"0d94f51fdca1782b63e4fbe02794deea"}" AS tb on 
        ta.endpoint = tb.endpoint AND 
        ta.endpoint = '${endpoint}' WHERE ta.user_id = ${userID};`;
        const {
          rows
        } = await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLquery);
        const {
          id,
          password,
          lastcalled,
          previouslycalled
        } = rows[0];
        const sessionID = bcrypt.hashSync(`${Date.now()}`, SALT_WORK_FACTOR);
        const ONE_HOUR = 1000 * 60 * 60;
        cookies.set('session', sessionID, {
          httpOnly: true,
          maxAge: ONE_HOUR
        });
        cookies.set('lastCalled', lastcalled, {
          httpOnly: true
        });
        cookies.set('previouslyCalled', `${previouslycalled}`, {
          httpOnly: true
        });
        cookies.set('serverID', id, {
          httpOnly: true
        });
        return res.status(200).json({
          password
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({
          error: err
        });
      }

    default:
      return res.status(500).json('Server Error in validateUser');
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateUser);

/***/ }),

/***/ 2773:
/***/ ((module) => {

"use strict";
module.exports = require("bcryptjs");

/***/ }),

/***/ 9038:
/***/ ((module) => {

"use strict";
module.exports = require("cookies");

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
var __webpack_exports__ = (__webpack_exec__(5892));
module.exports = __webpack_exports__;

})();
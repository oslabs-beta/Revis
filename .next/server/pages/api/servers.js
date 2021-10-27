(() => {
var exports = {};
exports.id = 452;
exports.ids = [452];
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

/***/ 4161:
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

const servers = async (req, res) => {
  let hashedPassword;
  let SQLquery = '';
  const cookies = new (cookies__WEBPACK_IMPORTED_MODULE_0___default())(req, res);
  const userId = cookies.get('ssid');
  const SALT_WORK_FACTOR = 10;
  const {
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        SQLquery = `SELECT * FROM "${"serverCloud"}" WHERE user_id = ${userId};`;
        const cloudDataFull = await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLquery);
        const cloud = cloudDataFull.rows;
        return res.status(200).json({
          success: true,
          cloud
        });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({
          success: false,
          error: err
        });
      }

    case 'POST':
      try {
        const parsedBody = JSON.parse(req.body);
        const {
          name,
          endpoint,
          password,
          port
        } = parsedBody;
        hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
        SQLquery += `INSERT INTO "${"serverCloud"}" (name,endpoint,port,password,user_id)
          VALUES ('${name}','${endpoint}',${port},'${hashedPassword}',${userId}); \n`;
        SQLquery += `INSERT INTO "${"0d94f51fdca1782b63e4fbe02794deea"}" (user_id,endpoint,password)
          VALUES (${userId},'${endpoint}','${password}');`;
        await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLquery);
        return res.status(200).json({
          success: true
        });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({
          success: false,
          error: err
        });
      }

    case 'DELETE':
      try {
        const parsedBody = JSON.parse(req.body);
        const {
          name
        } = parsedBody;
        SQLquery = `DELETE FROM "${"serverCloud"}" WHERE name = '${name}' AND user_id = ${userId}
        RETURNING endpoint;`;
        const endpointRows = await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLquery);
        const {
          endpoint
        } = endpointRows.rows[0];
        SQLquery = `DELETE FROM "${"0d94f51fdca1782b63e4fbe02794deea"}" WHERE endpoint = '${endpoint}' AND user_id = ${userId};`;
        await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLquery);
        return res.status(200).json({
          success: true
        });
      } catch (err) {
        console.log(`FAILED QUERY ${SQLquery}`);
        return res.status(400).json({
          success: false,
          error: err
        });
      }

    default:
      return res.status(400).json({
        success: false,
        error: 'Invalid request'
      });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (servers);

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
var __webpack_exports__ = (__webpack_exec__(4161));
module.exports = __webpack_exports__;

})();
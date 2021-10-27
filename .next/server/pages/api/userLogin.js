(() => {
var exports = {};
exports.id = 688;
exports.ids = [688];
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

/***/ 7589:
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

const userLogin = async (req, res) => {
  const SALT_WORK_FACTOR = 10;
  const parsedBody = JSON.parse(req.body);
  const {
    username,
    password
  } = parsedBody;
  res.setHeader('Content-Type', 'application/json');

  try {
    const cookies = new (cookies__WEBPACK_IMPORTED_MODULE_0___default())(req, res);
    const SQLquery = `SELECT * FROM "${"users"}" where username = '${username}';`;
    const {
      rows
    } = await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLquery);
    const userData = rows[0];
    const hashedPassword = userData.password;
    const compare = bcrypt.compareSync(password, hashedPassword);
    if (!compare) throw Error('Incorrect username or password. Please try again.');
    const sessionID = bcrypt.hashSync(`${Date.now()}`, SALT_WORK_FACTOR);
    console.log(`User: ${username} logged in`);
    const ONE_HOUR = 1000 * 60 * 60; // const SQLquerySession: string = `UPDATE "${process.env.PG_TABLE_USERS}"
    // SET session = '${sessionID}' WHERE username = '${username}';`;
    // await db.query(SQLquerySession);

    cookies.set('session', sessionID, {
      httpOnly: true,
      maxAge: ONE_HOUR
    });
    cookies.set('ssid', `${userData.user_id}`, {
      httpOnly: true
    });
    cookies.set('username', `${username}`, {
      httpOnly: true
    });
    return res.status(200).json(username);
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      error: 'Incorrect username or password. Please try again.'
    });
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userLogin);

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
var __webpack_exports__ = (__webpack_exec__(7589));
module.exports = __webpack_exports__;

})();
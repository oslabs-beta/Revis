(() => {
var exports = {};
exports.id = 322;
exports.ids = [322];
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

/***/ 6987:
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

const createUser = async (req, res) => {
  let hashedPassword;
  const parsedBody = JSON.parse(req.body);
  const {
    username
  } = parsedBody;
  const {
    password
  } = parsedBody;
  const {
    email
  } = parsedBody;
  const SALT_WORK_FACTOR = 10;

  try {
    const cookies = new (cookies__WEBPACK_IMPORTED_MODULE_0___default())(req, res);
    hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    const SQLquery = `INSERT INTO "${"users"}" (username,password,email)
         VALUES ('${username}','${hashedPassword}','${email}')
         RETURNING user_id;`;
    const userId = await _models_Revis__WEBPACK_IMPORTED_MODULE_1___default().query(SQLquery);
    cookies.set('ssid', `${userId}`, {
      httpOnly: true
    });
    cookies.set('username', `${username}`, {
      httpOnly: true
    });
    return res.status(200).json({
      success: true
    });
  } catch (err) {
    const {
      constraint
    } = err;

    switch (constraint) {
      case 'users_username_key':
        return res.status(400).json({
          success: false,
          error: 'This username is already taken. Please provide a unique username.'
        });

      case 'users_email_key':
        return res.status(400).json({
          success: false,
          error: 'This email is already taken. Please provide a unique email.'
        });

      default:
        return false;
    }
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createUser);

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
var __webpack_exports__ = (__webpack_exec__(6987));
module.exports = __webpack_exports__;

})();
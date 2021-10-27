const { Pool } = require('pg');

const config = {};

if (process.env.NODE_ENV === 'development') {
  config.connectionString = process.env.PG_URI;
} else if (process.env.NODE_ENV === 'production') {
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
  },
};

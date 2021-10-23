module.exports = {
  env: {
    PG_URI:
      'postgres://jlrxiqce:5CjZQ27IV1uExmsP-t_O-ZPPFA0NDmsU@fanny.db.elephantsql.com/jlrxiqce',
    REDIS_URL: 'redis-10027.c238.us-central1-2.gce.cloud.redislabs.com',
    REDIS_PORT: '10027',
    REDIS_PW: '91Ue9aQc1mReFlL36CGd3gK3wALASFxF',
    PG_TABLE_CLOUD: 'serverCloud',
    PG_TABLE_METRICS: 'metrics',
    PG_TABLE_USERS: 'users',
    PG_TABLE_REDIS: '0d94f51fdca1782b63e4fbe02794deea',
  },
  images: {
    domains: ['tonygentilcore.com'],
    loader: 'imgix',
    path: '/',
  },
  excludeFile: (str) => /\*.{spec,tests}.js/.test(str),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: '.',
};

module.exports = {
  env: {
    PG_URI:
      'postgres://jlrxiqce:5CjZQ27IV1uExmsP-t_O-ZPPFA0NDmsU@fanny.db.elephantsql.com/jlrxiqce',
    REDIS_URL: 'redis-16424.c289.us-west-1-2.ec2.cloud.redislabs.com',
    REDIS_PORT: '16424',
    REDIS_PW: 'redis',
    PG_TABLE_CLOUD: 'serverCloud',
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
};

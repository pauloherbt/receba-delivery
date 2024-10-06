const { env } = require("../config")

const config = {
  development: {
    client: "pg",
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      database: env.DB_NAME,
      password: env.DB_PASSWORD,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
    debug: true,
  },
  test: {
    client: "pg",
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      database: env.DB_NAME,
      password: env.DB_PASSWORD,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "src/db/migrations",
    },
    debug:false,
  }
};

module.exports = {
  ...config
};

require("dotenv").config({path:"../../.env"});
const config = process.env;
const conf = {
  client: "pg",
  connection: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations"
  },
  debug: true,
}
console.log(conf)

//const pg = require("knex")(conf);

module.exports ={
  development:conf
}

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "helloworld",
  host: "localhost",
  database: "explorer",
  port: 5432,
});

module.exports = pool;

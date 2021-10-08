const { Pool } = require("pg");

const docsDB = new Pool({
  user: process.env.DOCS_PG_USER,
  host: process.env.DOCS_PG_DB,
  database: process.env.DOCS_PG_DATABASE,
  password: process.env.DOCS_PG_PASSWORD,
  port: process.env.DOCS_PG_PORT,
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
docsDB.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// example query
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

module.exports = { docsDB };
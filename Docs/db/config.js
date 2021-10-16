require('dotenv').config();

module.exports = {
    user: process.env.DOCS_PG_USER,
    host: process.env.DOCS_PG_DB,
    database: process.env.DOCS_PG_DATABASE,
    password: process.env.DOCS_PG_PASSWORD,
    port: process.env.DOCS_PG_PORT,
}
const Pool = require('pg').Pool;
const config = require('./config');

module.exports = new Pool(config);
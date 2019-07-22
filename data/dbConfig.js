const knex = require('knex');
modules.exports = knex(require('../knexfile').development);
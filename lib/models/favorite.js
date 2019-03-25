// lib/models/favorite.js
const test = process.env.NODE_ENV || 'test';
const test_config = require('../../knexfile')[test];
const test_database = require('knex')(test_config);

// const environment = process.env.NODE_ENV || 'development';
// const configuration = require('./knexfile')[environment];
// const database = require('knex')(configuration);

const all = () => test_database('favorites').select();

module.exports = {
  all,
  test_database,
  // database,
}

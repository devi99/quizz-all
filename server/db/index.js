// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:azerty123@localhost:5432/quiz",
  ssl: {
    rejectUnauthorized: false
  }
});

// const pool = new Pool({
//   user: 'quizer',
//   host: 'localhost',
//   database: 'quiz',
//   password: 'azerty123',
//   port: 5432,
// })

pool.on('connect', () => {
  //console.log('connected to the db');
});

/**
 * DB Query
 * @param {string} text
 * @param {Array} params
 * @returns {object} object 
 */
const query = (text, params) => {
  return new Promise((resolve, reject) => {
    //console.log('text: ' + text);
    //console.log('params: ' + params);
    pool.query(text, params)
    .then((res) => {
      console.log('res: ' + res);
      resolve(res);
    })
    .catch((err) => {
      console.log('err query index.js: ' + err);
      reject(err);
    })
  })
}

module.exports = {
  query
};

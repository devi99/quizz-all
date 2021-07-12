const dotenv = require('dotenv');
var db = require('../db');

const getGenres = async (request, response) => {
  const findAllQuery = 'SELECT * FROM genres';
    try {
        const { rows, rowCount } = await db.query(findAllQuery);
        return response.status(200).json(rows)

    } catch(error) {
        return response.status(400).send(error);
    }
};

module.exports = {
  getGenres
}  
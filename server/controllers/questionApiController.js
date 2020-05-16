const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://localhost:5432/quiz"
});

pool.on('connect', () => {
  //console.log('connected to the db');
});

const getQuestions = (request, response) => {
  console.log('getQuestions');
  
  pool.query('SELECT * FROM questions ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

// Display detail page for a specific question.
const getQuestionDetail = (req, res) => {
  const findOneQuery = 'SELECT * FROM questions WHERE id=$1';
  
  pool.query(findOneQuery, [req.params.id], (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows[0])
  });
};

  const updateQuestion = (request, response) => {
    //const updateQuery = 'UPDATE questions SET title = $1, subtext = $2,  typequestion = $3,  correctanswer = $4 ,  fakeanswer1 = $5 , fakeanswer2 = $6 , fakeanswer3 = $7 ,fakeanswer4 = $8 , fakeanswer5 = $9 , typemedia = $10 , urlmedia = $11, genres = $12 WHERE id = $13 returning *';
    var question = 
    [ request.body.title,
      request.body.typequestion,
        request.body.id
    ];
    const updateQuery = 'UPDATE questions SET title = $1, typeQuestion = $2 WHERE id = $3 returning *';
    var values = question;    
    pool.query(updateQuery, values, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };

  const updateQuestionAll = (request, response) => {
    //console.log(request.body);
    var question = 
    [ request.body.title,
      request.body.typequestion,
        request.body.id
    ];
    const updateQuery = 'UPDATE questions SET title = $1, typeQuestion = $2 WHERE id = $3 returning *';
    var values = question;    
    pool.query(updateQuery, values, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
    //const updateQuery = 'UPDATE questions SET title = $1, subtext = $2,  typequestion = $3,  correctanswer = $4 ,  fakeanswer1 = $5 , fakeanswer2 = $6 , fakeanswer3 = $7 ,fakeanswer4 = $8 , fakeanswer5 = $9 , typemedia = $10 , urlmedia = $11, genres = $12 WHERE id = $13 returning *';
  };

  module.exports = {
    getQuestions,
    updateQuestion,
    getQuestionDetail,
    updateQuestionAll
  }  
const dotenv = require('dotenv');
var db = require('../db');

const getQuestions = async (request, response) => {
  const findAllQuery = 'SELECT * FROM questions ORDER BY question_id ASC';
    try {
        const { rows, rowCount } = await db.query(findAllQuery);
        return response.status(200).json(rows)

    } catch(error) {
        return response.status(400).send(error);
    }
};

const postQuestionCreate = (req, res) => {
  const _query = `
  INSERT INTO public.questions
    DEFAULT VALUES RETURNING question_id;`;
    //const { row } = await db.query(createGameQuery, values);
  db.query(_query, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows[0])
  });
};

// Display detail page for a specific question.
const getQuestionDetail = async (req, res) => {
  
  const findOneQuery = 'SELECT * FROM questions WHERE question_id=$1';
  try {
      const { rows, rowCount } = await db.query(findOneQuery, [req.params.id]);
      return res.status(200).json(rows[0])

  } catch(error) {
      return res.status(400).send(error);
  }
};

const updateQuestion = (request, response) => {
  //const updateQuery = 'UPDATE questions SET title = $1, subtext = $2,  typequestion = $3,  correctanswer = $4 ,  fakeanswer1 = $5 , fakeanswer2 = $6 , fakeanswer3 = $7 ,fakeanswer4 = $8 , fakeanswer5 = $9 , typemedia = $10 , urlmedia = $11, genres = $12 WHERE id = $13 returning *';
  var question = 
  [ request.body.value,
      request.params.id
  ];
  const updateQuery = 'UPDATE questions SET ' + request.body.path + ' = $1 WHERE question_id = $2 returning *';
  var values = question;    
  db.query(updateQuery, values, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

const updateQuestionAll = async (request, response) => {

  var question = 
  [ request.body.title,
    request.body.subtext,
    request.body.typequestion,
    request.body.correctanswer,  
    request.body.fakeanswer1 , 
    request.body.fakeanswer2 , 
    request.body.fakeanswer3 ,
    request.body.fakeanswer4 , 
    request.body.fakeanswer5 , 
    request.body.typemedia , 
    request.body.urlmedia,
    request.body.genres,
    request.body.question_id
  ];
  const updateQuery = `UPDATE questions SET
  title = $1, 
  subtext = $2,
  typequestion = $3, 
  correctanswer = $4,  
  fakeanswer1 = $5 , 
  fakeanswer2 = $6 , 
  fakeanswer3 = $7 ,
  fakeanswer4 = $8 , 
  fakeanswer5 = $9 , 
  typemedia = $10 , 
  urlmedia = $11,
  genres = $12
  WHERE question_id = $13 returning *
  `;
  var values = question; 
  try {
      const { rows, rowCount } = await db.query(updateQuery, values);
      return response.status(200).json(rows[0])

  } catch(error) {
      return response.status(400).send(error);
  }
  //const updateQuery = 'UPDATE questions SET title = $1, subtext = $2,  typequestion = $3,  correctanswer = $4 ,  fakeanswer1 = $5 , fakeanswer2 = $6 , fakeanswer3 = $7 ,fakeanswer4 = $8 , fakeanswer5 = $9 , typemedia = $10 , urlmedia = $11, genres = $12 WHERE id = $13 returning *';
};

module.exports = {
  postQuestionCreate,
  getQuestions,
  updateQuestion,
  getQuestionDetail,
  updateQuestionAll
}  
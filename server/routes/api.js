var express = require('express');
var router = express.Router();
//const Game = require('../models/question');
var bodyParser = require('body-parser');

// Require our controllers.
//var api = require('../controllers/questionApiController'); 
var apiQuestions = require('../controllers/questionApiController'); 
var apiGenres = require('../controllers/genreApiController'); 

/// QUESTIONS ROUTES ///
var jsonParser = bodyParser.json()

// GET question home page.
//router.get('/', question_controller.question_list);  
router.get('/questions', apiQuestions.getQuestions);  

// GET request for one question.
router.get('/question/:id', apiQuestions.getQuestionDetail);

router.get('/genres/dropdown', apiGenres.getGenres);  

router.post('/questions/new', apiQuestions.postQuestionCreate);
router.put('/question/update', jsonParser, apiQuestions.updateQuestionAll);
router.patch('/question/:id/update', jsonParser, apiQuestions.updateQuestion);

// GET request for creating a Question. NOTE This must come before route that displays question (uses id).
//router.get('/create', question_controller.question_create_get);

// POST request for creating Question.
//router.post('/create', question_controller.question_create_post);

// GET request to delete question.
//router.get('/:id/delete', question_controller.question_delete_get);

// POST request to delete question.
//router.post('/:id/delete', question_controller.question_delete_post);

// GET request to update question.
//router.get('/:id/update', apiQuestions.question_update_get);

// POST request to update question.
//router.post('/:id/update', question_controller.question_update_post);

module.exports = router;
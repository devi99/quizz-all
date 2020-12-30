var express = require('express');
var router = express.Router();
//const Game = require('../models/question');
var bodyParser = require('body-parser');

// Require our controllers.
var api = require('../controllers/questionApiController'); 
var apiQuestions = require('../controllers/questionController'); 
var apiGenres = require('../controllers/genreController'); 

/// QUESTIONS ROUTES ///
var jsonParser = bodyParser.json()

// GET question home page.
//router.get('/', question_controller.question_list);  
router.get('/questions', api.getQuestions);  

// GET request for one question.
router.get('/question/:id', api.getQuestionDetail);

router.get('/genres/dropdown', apiGenres.genre_dropdown);  

router.post('/questions/new', api.postQuestionCreate);
router.put('/question/update', jsonParser, api.updateQuestionAll);
router.patch('/question/:id/update', jsonParser, api.updateQuestion);

// GET request for creating a Question. NOTE This must come before route that displays question (uses id).
//router.get('/create', question_controller.question_create_get);

// POST request for creating Question.
//router.post('/create', question_controller.question_create_post);

// GET request to delete question.
//router.get('/:id/delete', question_controller.question_delete_get);

// POST request to delete question.
//router.post('/:id/delete', question_controller.question_delete_post);

// GET request to update question.
router.get('/:id/update', apiQuestions.question_update_get);

// POST request to update question.
//router.post('/:id/update', question_controller.question_update_post);

module.exports = router;
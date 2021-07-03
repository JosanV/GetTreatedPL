const express = require('express');
const router = express.Router();
const Question = require('../model/question.js').Question;
const Answer = require('../model/answer.js').Answer;
const checkToken = require('../helper/checkToken').checkToken;
const { ErrorHandler } = require('../helper/error')

router.get('/all', checkToken, async function (req, res, next) {
    try {
        let questions = await Question.find()//.
        console.log(questions)
        //populate('anything').

        if (questions) {
            res.status(200).json({
                questions
            });
        }
        else {
            res.status(404).json({
                message: "No questions found."
            });
        }

    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.post('/get/id/:questionID', checkToken, async function (req, res, next) {
    try {
        let idToReturn = req.params.questionID;

        let question = await Question.findById(idToReturn)//.
        //populate('anything').

        if (question) {
            // getting answers of this question
            let answers = await Answer.find({ question: question.id });

            res.status(200).json({
                question,
                answers
            });
        }
        else {
            res.status(404).json({
                message: "No question with such ID found."
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post('/get/user/id', checkToken, async function (req, res, next) {
    try {
        let queriedID = req.user._id;
        let question = await Question.find({ createdBy: queriedID })//.
        //populate('something')
        if (question) {
            res.status(200).json(question);
        }
        else {
            res.status(404).json({
                message: "No question with this proprietor found."
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post('/new', checkToken, async function (req, res, next) {
    try {

        if (!req.user) {
            throw new ErrorHandler(403, "You can only ask questions while connected.");
        }
        else {
            // creating new question
            let question = new Question();
            question.createdBy = req.user._id;
            question.title = req.body.title;
            question.description = req.body.description;
            question.language = req.body.language;

            await question.save();

            res.status(200).json({
                message: "Question created successfully.",
                question: question,
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;

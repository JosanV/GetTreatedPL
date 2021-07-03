const express = require('express');
const router = express.Router();
const Answer = require('../model/answer.js').Answer;
const checkToken = require('../helper/checkToken').checkToken;
const { ErrorHandler } = require('../helper/error')

router.post('/new/question/:questionID', checkToken, async function (req, res, next) {
    try {

        question_id = req.params.questionID;

        if (!req.user) {
            throw new ErrorHandler(403, "You can only answer questions while connected.");
        }
        else {
            // creating new answer
            let answer = new Answer();
            answer.author = req.user._id;
            answer.question = question_id;
            answer.content = req.body.content;

            await answer.save();

            res.status(200).json({
                message: "Answer created successfully.",
                answer: answer,
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get('/question/id/:questionID', checkToken, async function (req, res, next) {
    try {
        let idToReturn = req.params.questionID;

        let answers = await Answer.find({ question: question.id });


        if (answers) {

            res.status(200).json({
                answers
            });
        }
        else {
            res.status(404).json({
                message: "No answers for this question"
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;

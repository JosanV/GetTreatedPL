const express = require('express');
const router = express.Router();
const Diagnosis = require('../model/Diagnosis.js').Diagnosis;
const checkToken = require('../helper/checkToken').checkToken;
const { ErrorHandler } = require('../helper/error')

router.post('/new', checkToken, async function (req, res, next) {
    try {

        if (!req.user) {
            throw new ErrorHandler(403, "You can only submit diagnosis while connected.");
        }
        else {
            // creating new diagnosis
            let diagnosis = new Diagnosis();
            diagnosis.createdBy = req.user._id;
            diagnosis.symptoms = req.body.symptoms;
        
            await diagnosis.save();

            res.status(200).json({
                message: "Diagnosis created successfully.",
                diagnosis: diagnosis,
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;

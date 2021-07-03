const express = require('express');
const router = express.Router();
const Location = require('../model/location.js').Location;
const checkToken = require('../helper/checkToken').checkToken;
const { ErrorHandler } = require('../helper/error')

router.post('/get/all', checkToken, async function (req, res, next) {
    try {

        let locations = await Location.find()//.
        //populate('anything').

        if (locations) {
            res.status(200).json({
                locations
            });
        }
        else {
            res.status(404).json({
                message: "No locations found."
            });
        }

    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.post('/get/by-languages', checkToken, async function (req, res, next) {
    try {
        let idToReturn = req.params.questionID;
        let spokenLanguages = req.body.spokenLanguages;

        let locations = await Locations.findById({ spokenLanguages: { $in: spokenLanguages } })//.
        //populate('anything').

        if (locations) {
            res.status(200).json({
                locations
            });
        }
        else {
            res.status(404).json({
                message: "No locations with such languages found."
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
            throw new ErrorHandler(403, "You can only submit locations while connected.");
        }
        else {
            // creating new location
            let location = new Location();
            location.submittedBy = req.user._id;
            location.name = req.body.name;
            location.url = req.body.url;
            location.spokenLanguages = req.body.spokenLanguages;
    
            await location.save();

            res.status(200).json({
                message: "Location created successfully.",
                location: location,
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;

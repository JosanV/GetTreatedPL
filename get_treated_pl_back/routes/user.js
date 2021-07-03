const express = require('express');
const router = express.Router();
const User = require('../model/user.js').User;
const checkToken = require('../helper/checkToken').checkToken;
const checkUserInFirebaseNotRegistered = require('../helper/checkToken').checkUserInFirebaseNotRegistered;
const secureUser = require('../helper/secureUser').secureUser;
const ErrorHandler = require('../helper/error').ErrorHandler;
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + ".jpg")
    }
});

const fileFilter = (req, file, cb) => {   // check if uploaded file is .jpg
    if (file.mimetype == "image/jpg") {
        cb(null, true);
    }
    else {
        cb(new ErrorHandler(400, "File uploaded is not an image"), false);
    }
}

let upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/login", checkToken, (req, res, next) => {
    try {
        let user = req.user;
        if (user) {
            user = secureUser(user)
            res.status(200).send({
                success: true,
                user
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "No user account linked to this firebase account found in DB."
            })
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
})

router.post("/register", checkUserInFirebaseNotRegistered, async (req, res, next) => {
    try {
        if (req.userInFirebaseNotRegistered) {
            console.log(req.body)
            let newUser = new User({
                email: req.email,
                name: req.body.name,
                spokenLanguages: ["French", "English"]
            });
            await newUser.save();
            res.status(201).json({
                message: "User in DB successfully created.",
                user: secureUser(newUser)
            });
        }
        else {
            throw new ErrorHandler(403, "You already registered a user account.");
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
})

router.post('/send/password-reset-link', checkToken, async function (req, res, next) {
    try {
        if (!req.user) {
            throw new ErrorHandler(403, "You cannot update this user account.");
        }
        else {
            const userEmail = req.user.email;
            let passwdResetLink = await admin.auth().generatePasswordResetLink(userEmail);
            console.log(passwdResetLink);
            req.status(204).send();
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.get('/get/my-profile', checkToken, async function (req, res, next) {
    try {
        let user = req.user;
        res.json({ user })
    } catch (e) {
        console.log(e);
        next(e);
    }
});

router.post('/get/id/:userID', checkToken, async function (req, res, next) {
    try {
        let idToReturn = req.params.userID;

        let user = await User.findById(idToReturn);

        if (user) {
            res.status(200).send(secureUser(user));
        }
        else {
            res.status(404).send({
                message: "No user account with such ID found."
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});


router.put('/update/id/:userID', checkToken, upload.single('profilePicture'), async function (req, res, next) {
    try {
        let idToUpdate = req.params.userID;
        let body = req.body // Parsing body of the request;

        if (!req.user || idToUpdate != req.user.id) {
            throw new ErrorHandler(403, "You cannot update this user account.");
        }

        let user = await User.findById(userID);
        if (user) {    // Then we update the fields
            user.firstname = body.firstname;
            user.lastname = body.lastname;
            user.spokenLanguages = body.spokenLanguages;
            // user.profilePicture = req.image.filename;
            let updatedUser = await user.save();
            res.json({                             // Returns updated user object
                message: "User in DB successfully updated.",
                user: secureUser(updatedUser)
            });
        }

        else {
            res.status(404).send({
                message: "No user account with such ID found."
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

/* Delete your user account */
router.delete('/id/:userID', checkToken, async function (req, res, next) {
    try {
        let idToDelete = req.params.userID;

        // Checking if connected as user it is user that tries to delete account
        if (!req.user || idToDelete != req.user.id) {
            throw new ErrorHandler(403, "You cannot delete this user account.");
        }

        // If correct user we delete its account
        else {
            await User.findByIdAndDelete(idToDelete);
            res.status(200).send({
                message: "User account deleted successfully."
            });
        }
    } catch (e) {
        console.log(e);
        next(e);
    }
});

module.exports = router;

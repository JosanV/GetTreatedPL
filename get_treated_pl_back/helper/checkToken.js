// This helper verifies the Firebase token and links it with user in DB
const User = require('../model/user').User;

const admin = require('firebase-admin');
const serviceAccount = require("../keys/gettreatedpl-firebase-adminsdk-hia07-822dd6dadc.json"); // Need to put our account




admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "OUR_FIREBASE_IO_URL"
});





// Check token method
exports.checkToken = function (req, res, next) {
    // getting the token in request header
    const token = req.header('token');
    if (token != undefined) {
        // If token is present in header, we check its authenticity and link it to user email
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                // If correctly verified, we use the email to fetch the correct user from DB
                console.log("/////////////////// auth OK");
                let email = decodedToken.email;
                User.findOne({ email: email }, (err, user) => {
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        res.sendStatus(401);
                    }
                });
            }).catch(function (error) {
                // Handle error
                console.log(error);
                res.sendStatus(401);
            });
    } else {
        console.log("No token")
        res.sendStatus(400);
    }
}

// method check if user in firebase
exports.checkUserInFirebaseNotRegistered = function (req, res, next) {
    // getting the token in request header
    const token = req.header('token');
    console.log(token);
    if (token) {
        // If token is present in header, we check its authenticity and link it to user email
        admin.auth().verifyIdToken(token)
            .then(function (decodedToken) {
                // If correctly verified, we use the email to fetch the correct user from DB
                let email = decodedToken.email;
                req.email = email;
                User.findOne({ email: email }, (err, user) => {
                    if (user) {
                        req.userInFirebaseNotRegistered = false;
                        next();
                    } else {
                        req.userInFirebaseNotRegistered = true;
                        next();
                    }
                });
            }).catch(function (error) {
                // Handle error
                console.log(error);
                res.sendStatus(401);
            });
    } else {
        res.sendStatus(400);
    }
}

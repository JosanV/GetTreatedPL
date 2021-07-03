// To connect to MongoDB
// Load mongoDB node driver (mongoose)
const mongoose = require('mongoose');


const connect = function (callback) {
    mongoose.set("debug", true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useNewUrlParser', true);
    // Set 2/2.12 or later in mongoDB atlas
    mongoose.connect("mongodb+srv://maxime:maxime54321@cluster0.ot2kp.mongodb.net/<dbname>?retryWrites=true&w=majority");
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, " Connection error"));
    db.once("open", function () {
        // mongoose.connection.db.list names) {
        //     console.log(names); // [{ name: 'dbname.myCollection' }]
        // });Collections().toArray(function (err,
        console.log('Nice, you are connected to the database');
        callback();
    });
};

// creating an error

const processError = function (err, res, callback) {
    if (err) {
        res.json({
            success: false,
            error: {
                message: err.message
            }
        });
    } else {
        callback();
    }
};

module.exports.processError = processError;
module.exports.connect = connect;


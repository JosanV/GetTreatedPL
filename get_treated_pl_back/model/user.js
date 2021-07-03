const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { uuid } = require('uuidv4');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    publicId: {
        type: String,
        default: uuid()
    },

    profilePicture: String, // url of photo
    name: String,

    spokenLanguages: {
        type: [String]
    },

    dateCreation: {
        type: Date,
        default: new Date()
    }

});





const User = mongoose.model("User", userSchema);
exports.User = User;

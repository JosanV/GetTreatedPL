const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    spokenLanguages: {
        type: [String],
        required: true
    },

    url: {
        type: String,
        required: true
    },

    dateAdded: {
        type: Date,
        default: new Date()
    },

    wasReported: {
        type: Boolean,
        default: false
    }
});






const Location = mongoose.model("Location", locationSchema);
exports.Location = Location;

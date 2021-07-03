const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    dateCreation: {
        type: Date,
        default: new Date()
    },

    title: {
        type: String,
        default: true,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    numberOfAnswers: {
        type: Number,
        default: 0
    },

    wasReported: {
        type: Boolean,
        default: false
    }
});






const Question = mongoose.model("Question", questionSchema);
exports.Question = Question;

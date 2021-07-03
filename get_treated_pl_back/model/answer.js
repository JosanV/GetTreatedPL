const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    content: String, // Answer message

    dateCreation: {
        type: Date,
        default: new Date()
    },

    wasReported: {
        type: Boolean,
        default: false
    }
});






const Answer = mongoose.model("Answer", answerSchema);
exports.Answer = Answer;

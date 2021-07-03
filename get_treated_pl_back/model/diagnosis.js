const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    dateCreation: {
        type: Date,
        default: new Date()
    },

    symptoms: {
        type: Array,
        required: true
    },
});






const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);
exports.Diagnosis = Diagnosis;

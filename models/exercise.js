const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    targetArea: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Exercise', exerciseSchema)
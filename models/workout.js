const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    targetArea: {
        type: String,
        required: true,
    },
    equipment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'},
    userName: String,
    userAvatar: String
})

module.exports = mongoose.model('Workout', workoutSchema)
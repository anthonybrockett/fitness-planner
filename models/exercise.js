const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enoteSchema = new Schema({
    content: {
      type: String,
      match: /.{1,}/,
      required: true
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
  });

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    targetArea: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'},
    userName: String,
    userAvatar: String,
    enotes: [enoteSchema]
})

module.exports = mongoose.model('Exercise', exerciseSchema)
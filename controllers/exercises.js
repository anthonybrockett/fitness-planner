const Exercise = require('../models/exercise');

module.exports = {
    index,
    new: newExercise
}

function index(req, res) {
    Exercise.find({}, function(err, exercises) {
        res.render('exercises/index', { title: 'Exercise List', exercises})
    });
}

function newExercise(req, res) {
    res.render('exercises/new', { title: 'New Exercise'})
}
const Workout = require('../models/workout');

module.exports = {
    index,
    new: newWorkout
}

function index(req, res) {
    Workout.find({}, function(err, workouts) {
        res.render('workouts/index', { title: 'Workouts', workouts})
    });
}

function newWorkout(req, res) {
    res.render('workouts/new', { title: 'New Workout'})
}
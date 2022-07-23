const Workout = require('../models/workout');

module.exports = {
    index,
    new: newWorkout,
    create,
    show
}

function index(req, res) {
    Workout.find({}, function(err, workouts) {
        res.render('workouts/index', { title: 'Workouts', workouts})
    })
    .sort('targetArea')
    .sort('name')
}

function newWorkout(req, res) {
    res.render('workouts/new', { title: 'New Workout'})
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    Workout.create(req.body, function(err, workout) {
        workout.save(function(err) {
            res.redirect(`/workouts`)   
        });
    })
}

function show(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
        res.render('workouts/show', { title: `${workout.name}`, workout })
    })
}
const Workout = require('../models/workout');

module.exports = {
    index,
    new: newWorkout,
    create,
    show,
    delete: deleteWorkout,
    edit,
    update
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

function deleteWorkout(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
        if (!workout) throw new Error('Nice Try!');
        workout.remove(req.params.id);
        res.redirect(`/workouts`);
    });
}

function edit(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
        res.render(`workouts/edit`, {title: `${workout.name}`, workout })
    });
}
    
function update(req, res) {
    Workout.findById(req.params.id, function(err, updatedWorkout) {
        req.body.name = updatedWorkout.name;
        req.body.targetArea = updatedWorkout.targetArea;
        req.body.equipment = updatedWorkout.difficulty;
        res.redirect(`/workouts/${req.params.id}`)
    });
}
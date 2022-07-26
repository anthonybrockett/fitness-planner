const Exercise = require('../models/exercise');
const Workout = require('../models/workout');

module.exports = {
    index,
    new: newExercise,
    create,
    show,
    delete: deleteExercise,
    edit,
    update,
    addToExerciseList,
    removeFromExerciseList
}

function index(req, res) {
    Exercise.find({user: req.user})
        .sort({targetArea: 1, name: 1})
        .exec(function(err, exercises) {
           res.render('exercises/index', { title: 'Exercise List', exercises})
         });
}

function newExercise(req, res) {
    res.render('exercises/new', { title: 'New Exercise'})
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    Exercise.create(req.body, function(err, exercise) {
            res.redirect('/exercises')   
        });
}

function show(req, res) {
    Exercise.findById(req.params.id, function(err, exercise) {
        res.render('exercises/show', { title: `${exercise.name}`, exercise })
    })
}

function deleteExercise(req, res) {
    Exercise.findOneAndDelete(
        {_id: req.params.id, user: req.user._id}, function(err) {
            res.redirect('/exercises');
        }
    );
}

function edit(req, res) {
    Exercise.findOne({_id: req.params.id, user: req.user._id}, function(err, exercise) {
        if (err || !exercise) return res.redirect('/exercises');
        res.render('exercises/edit', {title: `${exercise.name}`, exercise});
    });
}

function update(req, res) {
    Exercise.findOneAndUpdate(
      {_id: req.params.id, user: req.user._id},
      req.body,
      {new: true},
      function(err, exercise) {
        if (err || !exercise) return res.redirect('/exercises');
        res.redirect(`/exercises/${exercise._id}`);
      }
    );
}

function addToExerciseList(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
        workout.exerciseList.push(req.body.exerciseId);
        workout.save(function(err) {
            res.redirect(`/workouts/${workout._id}`);
        });
    });
}

function removeFromExerciseList(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
        workout.exerciseList.remove(req.params.exerciseId);
        workout.save(function(err){
            res.redirect(`/workouts/${workout._id}`);
        })
    })
}
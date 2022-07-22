const Exercise = require('../models/exercise');

module.exports = {
    index,
    new: newExercise,
    create
}

function index(req, res) {
    Exercise.find({}, function(err, exercises) {
        res.render('exercises/index', { title: 'Exercise List', exercises})
    });
}

function newExercise(req, res) {
    res.render('exercises/new', { title: 'New Exercise'})
}

function create(req, res) {
    // Exercise.findById(req.params.id, function(err, exercise) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        Exercise.create(req.body, function(err, exercise) {
            exercise.save(function(err) {
                res.redirect('/exercises/new')   
            });
        })
    // })
}
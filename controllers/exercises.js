const Exercise = require('../models/exercise');

module.exports = {
    index,
    new: newExercise,
    create,
    show,
    delete: deleteExercise,
    edit,
    update
}

function index(req, res) {
    Exercise.find({}, function(err, exercises) {
        res.render('exercises/index', { title: 'Exercise List', exercises})
    })
    .sort('targetArea')
    .sort('name')
}

function newExercise(req, res) {
    res.render('exercises/new', { title: 'New Exercise'})
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    Exercise.create(req.body, function(err, exercise) {
        exercise.save(function(err) {
            res.redirect('/exercises')   
        });
    })
}

function show(req, res) {
    Exercise.findById(req.params.id, function(err, exercise) {
        res.render('exercises/show', { title: `${exercise.name}`, exercise })
    })
}

function deleteExercise(req, res) {
    Exercise.findById(req.params.id, function(err, exercise) {
        if (!exercise) throw new Error('Nice Try!');
        exercise.remove(req.params.id);
        res.redirect(`/exercises`);
    });
}

function edit(req, res) {
    Exercise.findById(req.params.id, function(err, exercise) {
        res.render(`exercises/edit`, {title: `${exercise.name}`, exercise })
    });
}
    
function update(req, res) {
    Exercise.findById(req.params.id, function(err, updatedExercise) {
        // exercise.name = req.body.name;
        // exercise.targetArea = req.body.targetArea;
        // exercise.difficulty = req.body.difficulty;
        req.body.name = updatedExercise.name;
        req.body.targetArea = updatedExercise.targetArea;
        req.body.difficulty = updatedExercise.difficulty;
        res.redirect(`/exercises/${req.params.id}`)
    });
}
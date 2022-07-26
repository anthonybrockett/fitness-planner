const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

module.exports = {
    index,
    new: newWorkout,
    create,
    show,
    delete: deleteWorkout,
    edit,
    update,
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

// TODO: Can only create a workout if the ones present have exercises
function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    console.log(req.body)
    Workout.create(req.body, function(err, workout) {
        console.log(workout)
        if(err) {console.log(err); return res.redirect('/workouts/new')}
        res.redirect(`/workouts`)   
    });
}

function show(req, res) {
    Workout.findById(req.params.id)
    .populate('exerciseList')
    .exec(function(err, workout) {
        Exercise.find(
            {_id: {$nin: workout.exerciseList}},
            function(err, exercises) {
                res.render('workouts/show', {
                    title: `${workout.name} Detail`, 
                    workout, 
                    exercises
                });
            }
        );
    });
}

function deleteWorkout(req, res) {
    Workout.findOneAndDelete(
        {_id: req.params.id, user: req.user._id}, function(err) {
          res.redirect('/workouts');
        }
    );
}

function edit(req, res) {
    Workout.findOne({_id: req.params.id, user: req.user._id}, function(err, workout) {
        if (err || !workout) return res.redirect('/workouts');
        res.render('workouts/edit', {title: `${workout.name}`, workout });
    });
}

function update(req, res) {
    Workout.findOneAndUpdate(
      {_id: req.params.id, user: req.user._id},
      req.body,
      {new: true},
      function(err, workout) {
        if (err || !workout) return res.redirect('/workouts');
        res.redirect(`/workouts/${workout._id}`);
      }
    );
}
const Exercise = require('../models/exercise')

module.exports = {
    create,
    delete: deleteEnote
}

function create(req, res) {
    Exercise.findById(req.params.id, function(err, exercise) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        exercise.enotes.push(req.body);
        exercise.save(function(err) {
            res.redirect(`/exercises/${exercise._id}`)
        })
    })
}

function deleteEnote(req, res) {
    Exercise.findOne(
      {'enotes._id': req.params.id, 'enotes.userId': req.user._id},
      function(err, exercise) {
        if (!exercise || err) return res.redirect(`/exercises/${exercise._id}`);
        exercise.enotes.remove(req.params.id);
        exercise.save(function(err) {
          res.redirect(`/exercises/${exercise._id}`);
        });
      }
    );
  }
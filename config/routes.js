const router = require('express').Router();
const db = require('../models');

router.get('/sequences', function (req, res) {
    // Connecting to the database.
    db.Sequence.find({})
    .populate('sounds')
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      return res.json(err);
    });
});

router.post('/sounds', function (req, res) {
  // Connecting to the database.
  db.Sound.create({
    sound: "Clap", 
    steps: [
      { id: 1},
      { id: 2},
      { id: 3},
      { id: 4},
      { id: 5},
      { id: 6},
      { id: 7},
      { id: 8},
      { id: 9},
      { id: 10},
      { id: 11},
      { id: 12},
      { id: 13},
      { id: 14},
      { id: 15},
      { id: 16}
    ]
  }).then(() => {
    return res.json("created");
  });
});

module.exports = router;
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
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

const download = async function ({ body }, _, next) {
  const path = __dirname + "/../tmp/pattern.json";
  const data = JSON.stringify(body, null, 2);
  await writeFileAsync(path, data, 'utf8');
  next();
}
router.post('/download', download, function(_, res){
  const file =  __dirname + "/../tmp/pattern.json";
  res.download(file); // Set disposition and send it.
});

module.exports = router;
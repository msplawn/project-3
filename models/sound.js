const mongoose = require("mongoose");

const SoundSchema = new mongoose.Schema({
  sound: {
    type: String,
    required: true
  },
  steps: {
    type: Array,
    required: true
  }
});

const Sound = mongoose.model("Sound", SoundSchema);

module.exports = Sound;
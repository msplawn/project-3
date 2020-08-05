const mongoose = require("mongoose");

const SoundSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  label: {
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
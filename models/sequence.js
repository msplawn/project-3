const mongoose = require("mongoose");

const SequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sounds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sound"
  }]

});


const Sequence = mongoose.model("Sequence", SequenceSchema);

module.exports = Sequence;
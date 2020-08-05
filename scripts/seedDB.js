const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/sounds"
);

const sequenceSeed = [
  {
    sound: "Closed-Hat",
    steps: [
      { id: 1, active: true },
      { id: 2, active: true },
      { id: 3, active: true },
      { id: 4, active: true },
      { id: 5, active: true },
      { id: 6, active: true },
      { id: 7, active: true },
      { id: 8, active: true },
      { id: 9, active: true },
      { id: 10, active: true },
      { id: 11, active: true },
      { id: 12, active: true },
      { id: 13, active: true },
      { id: 14, active: true },
      { id: 15, active: true },
      { id: 16, active: true }
    ]
  },
  {
    sound: "Open-Hat",
    steps: [
      { id: 1, active: false },
      { id: 2, active: false },
      { id: 3, active: true },
      { id: 4, active: false },
      { id: 5, active: false },
      { id: 6, active: false },
      { id: 7, active: false },
      { id: 8, active: false },
      { id: 9, active: false },
      { id: 10, active: false },
      { id: 11, active: true },
      { id: 12, active: false },
      { id: 13, active: false },
      { id: 14, active: false },
      { id: 15, active: false },
      { id: 16, active: false }
    ]
  },
  {
    sound: "Snare",
    steps: [
      { id: 1, active: false },
      { id: 2, active: false },
      { id: 3, active: true },
      { id: 4, active: false },
      { id: 5, active: true },
      { id: 6, active: false },
      { id: 7, active: false },
      { id: 8, active: false },
      { id: 9, active: false },
      { id: 10, active: false },
      { id: 11, active: false },
      { id: 12, active: false },
      { id: 13, active: true },
      { id: 14, active: false },
      { id: 15, active: false },
      { id: 16, active: false }
    ]
  },
  {
    sound: "Kick",
    steps: [
      { id: 1, active: true },
      { id: 2, active: false },
      { id: 3, active: false },
      { id: 4, active: false },
      { id: 5, active: false },
      { id: 6, active: false },
      { id: 7, active: false },
      { id: 8, active: false },
      { id: 9, active: false },
      { id: 10, active: false },
      { id: 11, active: true },
      { id: 12, active: false },
      { id: 13, active: false },
      { id: 14, active: false },
      { id: 15, active: false },
      { id: 16, active: false }
    ]
  }
];

const init = async () => {
  await db.Sequence.deleteMany({});
  await db.Sound.deleteMany({});
  const data = await db.Sound.insertMany(sequenceSeed);
  await db.Sequence.create({ name: "Sequence 1" });
  await db.Sequence.findOneAndUpdate({ name: "Sequence 1"}, { $addToSet: { sounds: data.map(sound => sound._id) } });
  console.log(data);
  console.log("Success");
};

init();

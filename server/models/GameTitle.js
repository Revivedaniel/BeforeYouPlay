const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameTitleSchema = new Schema({
  title: { type: String, required: true },
  gameGenerated: { type: Boolean, required: true, default: false },
  imageName: { type: String, required: true, default: 'byp-new-game'},
  lazyAfternoonContent: { type: Boolean, required: true, default: false },
  contentAddedDate: { type: Date, required: false},
  platforms: { type: [String], required: true, default: [] },
  genres: { type: [String], required: true, default: [] },
});

const GameTitle = mongoose.model("GameTitle", gameTitleSchema);

module.exports = GameTitle;

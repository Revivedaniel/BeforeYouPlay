const mongoose = require("mongoose");
const { Schema } = mongoose;

const gameTitleSchema = new Schema({
  title: { type: String, required: true },
  gameGenerated: { type: Boolean, required: true, default: false },
  imageName: { type: String, required: true, default: "byp-new-game" },
});

const GameTitle = mongoose.model("GameTitle", gameTitleSchema);

module.exports = GameTitle;

const mongoose = require("mongoose");

const { Schema } = mongoose;
const Review = require("./Review");

const ageRatingSchema = new Schema({
  title: { type: String, required: true },
  rating: { type: String, required: true },
});

const creditSchema = new Schema({
  title: { type: String, required: true },
  entries: { type: [String], required: true },
});

const releaseDateSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
});

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    platforms: {
      type: [String],
      required: true,
      default: [],
    },
    gameId: {
      type: Number,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
      default: "byp-new-game",
    },
    ageRatings: {
      type: [ageRatingSchema],
      required: true,
      default: [],
    },
    releaseDates: {
      type: [releaseDateSchema],
      required: true,
      default: [],
    },
    developers: {
      type: [String],
      required: true,
      default: [],
    },
    publishers: {
      type: [String],
      required: true,
      default: [],
    },
    genres: {
      type: [String],
      required: true,
      default: [],
    },
    gameModes: {
      type: [String],
      required: true,
      default: [],
    },
    series: String,
    credits: {
      type: [creditSchema],
      required: true,
      default: [],
    },
    summary: {
      type: String,
      required: true,
    },
    relatedGames: {
      type: [String],
      required: true,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = {Game, gameSchema};

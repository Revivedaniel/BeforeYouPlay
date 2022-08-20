const mongoose = require('mongoose');

const { Schema } = mongoose;
const Review = require('./Review');

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
        maxLength: 10000
    },
    image_url: {
        type: String,
    },
    release_year: {
        type: String,
    },
    genres: {
        type: String,
    },
    age_ratings: {
        type: String
    },
    slug: {
        type: String,
    },
    reviews: [
        Review.schema
    ],
    custom_datapoints: {
        type: String,
    },
    platforms: {
        type: String
    },
    lazy_afternoon_videos: {
        type: String
    },
    lazy_afternoon_review: {
        type: String
    },
    vgm_link: {
        type: String
    },
    needs_editing: {
        type: Boolean,
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
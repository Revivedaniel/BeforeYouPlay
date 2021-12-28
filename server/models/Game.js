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
    cover_id: {
        type: String,
    },
    release_year: {
        type: Number,
    },
    genres: {
        type: String,
    },
    age_rating: {
        type: Number
    },
    slug: {
        type: String,
    },
    reviews: [
        Review.schema
    ]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
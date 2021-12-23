const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
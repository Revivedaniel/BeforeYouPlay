const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    Summary: {
        type: String,
        required: true,
        maxLength: 10000
    },
    cover_id: {
        type: String,
        require: true,
    },
    release_year: {
        type: Number,
    },
    genres: {
        type: Array,
    },
    age_ratings: {
        type: Array
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
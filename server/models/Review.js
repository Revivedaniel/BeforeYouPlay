const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    //id, user id, game_id, starts, review_text
    username: {
        type: String,
        require: true, 
    },
    game_id: {
        type: Schema.Types.ObjectId, 
    },
    stars: {
        type: Number
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
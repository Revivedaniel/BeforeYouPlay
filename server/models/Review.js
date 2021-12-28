const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    //id, user id, game_id, starts, review_text
    user_id: {
        type: Schema.Types.ObjectId, 
    },
    game_id: {
        type: Schema.Types.ObjectId, 
    },
    stars: {
        type: Number
    },
    review_body: {
        type: String,
        maxLength: 1000
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
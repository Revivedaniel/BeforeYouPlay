const mongoose = require("mongoose");

const { Schema } = mongoose;

const videoSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    gameTitle: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Video", videoSchema);
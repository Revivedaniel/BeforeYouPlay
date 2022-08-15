const mongoose = require('mongoose');
const { Schema } = mongoose;

const freshDataSchema = new Schema({
    game_id:{
        type: Schema.Types.ObjectId,
    },
    created_at: {
        type: Date,
    },
    up_votes: {
        type: Number,
    },
    down_votes: {
        type: Number,
    },
    potentially_outdated: {
        type: Boolean,
    },
    data: {
        type: String,
    },
    data_title: {
        type: String,
    },
    admin_approvals: {
        type: Number,
    },
    votes_total: {
        type: Number,
    },
    manually_typed: {
        type: Boolean,
    },
})

const FreshData = mongoose.model('FreshData', freshDataSchema);

module.exports = FreshData;
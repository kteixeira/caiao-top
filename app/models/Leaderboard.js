const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Leaderboard = new Schema({
    team_id: { type: Schema.Types.ObjectId, ref: 'Teams' },
    obstacle_id: { type: Schema.Types.ObjectId, ref: 'Obstacles' },
    score: { type: Number, default: 0 },
    created_at: {type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model( 'leaderboard', Leaderboard );
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Players = new Schema({
    name: { type: String },
    mugshot: { type: String },
    team_id: { type: Schema.Types.ObjectId, ref: 'Teams', default: null },
    locale: { type: String },
    height: { type: String },
    weight: { type: Number },
    hobby: { type: String, default: null },
    custom: { type: String, default: null },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model( 'players', Players );
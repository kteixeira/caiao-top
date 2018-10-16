const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* types: 0 - players; 1 - vignette */
const Files = new Schema({
    name: { type: String, default: null },
    player_id: { type: Schema.Types.ObjectId, ref: 'Players' },
    path: { type: String, default: 0 },
    type: { type: Boolean, default: 1 },
    created_at: {type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model( 'files', Files );
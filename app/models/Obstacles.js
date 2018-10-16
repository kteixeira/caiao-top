const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Obstacles = new Schema({
    name: { type: String, default: null },
    position: { type: Number },
    created_at: {type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model( 'obstacles', Obstacles );
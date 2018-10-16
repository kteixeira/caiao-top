const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Teams = new Schema({
    name: { type: String, default: null },
    logo: { type: String, default: null },
    color: { type: String, default: '#ff0000' },
    status: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
})

module.exports = mongoose.model( 'teams', Teams )
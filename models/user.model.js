const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    chatCredits: {
        type: Number,
        required: true,
        default: 0,
    },
    dalleCredits: {
        type: Number,
        required: true,
        default: 0,
    },
    lastRefillDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const User = mongoose.model('users', userSchema);
module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    iterations: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
// User = mongoose.model('user', UserSchema)
// console.log(`type of "User": ${typeof(User)}`)
module.exports = mongoose.model('user', UserSchema)
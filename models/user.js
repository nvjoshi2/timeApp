const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
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
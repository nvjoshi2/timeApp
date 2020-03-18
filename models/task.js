const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    taskname: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('task', TaskSchema);
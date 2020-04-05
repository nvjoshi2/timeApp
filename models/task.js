const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('task', TaskSchema);
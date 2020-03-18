const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskInstanceSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    duration: {
        type: Number
    }
});

module.exports = mongoose.model('taskInstance', TaskInstanceSchema);
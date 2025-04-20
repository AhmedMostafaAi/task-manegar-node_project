const mongoose = require('mongoose');



const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        minlength: [3, 'Name must be at least 3 characters'],
        trim : true,
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);
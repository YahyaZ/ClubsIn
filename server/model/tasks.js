import mongoose from "mongoose";

let taskSchema = new mongoose.Schema({
    event_id: {
        required: [true, "Event id for this task cannot be blank"],
        type: mongoose.Schema.Types.ObjectId, 
        ref:'events'
    },
    created_date: {
        type: Date,
        default: Date.now, 
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    due_date: Date,
    name: {
        type: String,
        required: [true, "Task name cannot be blank"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description cannot be blank"],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    assignee: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
})

var Tasks = mongoose.model('Tasks', taskSchema, 'tasks');
module.exports = Tasks;
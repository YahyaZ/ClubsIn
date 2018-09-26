import mongoose from "mongoose";

let taskSchema = new mongoose.Schema({
    event_id: {
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
    name: String,
    description: String,
    completed: Boolean,
    assignee: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
})

var Tasks = mongoose.model('Tasks', taskSchema, 'tasks');
module.exports.Tasks = Tasks;
import mongoose, { Model, Schema  } from "mongoose";

module.exports.getUserSchema = getUserSchema;
module.exports.getClubSchema = getClubSchema;
module.exports.getEventSchema = getEventSchema;
module.exports.getTaskSchema = getEventSchema;
/**
 * Create a schema for users when connecting to our mongo database
 */
let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

/**
 * Club schema
 */
let clubSchema = new mongoose.Schema({
    name: String,
    type: String,
    university: String,
    members: []
});

let eventSchema = new mongoose.Schema({
    club_id: {type: Schema.Types.ObjectId, ref:'clubs'},
    name: String,
    description: String,
    date: Date
});

let taskSchema = new mongoose.Schema({
    event_id: {
        type: Schema.Types.ObjectId, 
        ref:'events'
    },
    created_date: {
        type: Date,
        default: Date.now, 
    },
    created_by: {
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    due_date: Date,
    name: String,
    description: String,
    completed: Boolean,
    assignee: [{type: Schema.Types.ObjectId, ref: 'users'}]
})

//Getter functions
function getUserSchema(){
    return userSchema;
}

function getClubSchema(){
    return clubSchema;
}

function getEventSchema(){
    return eventSchema;
}

function getTaskSchema(){
    return taskSchema;
}
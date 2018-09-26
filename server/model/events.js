import mongoose from "mongoose";

let eventSchema = new mongoose.Schema({
    club_id: {type: mongoose.Schema.Types.ObjectId, ref:'clubs'},
    name: String,
    description: String,
    date: Date,
    created_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    last_modified: Date
});

var Events = mongoose.model('events', eventSchema);
module.exports.Events = Events;
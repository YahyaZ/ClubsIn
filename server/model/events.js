import mongoose from "mongoose";

let eventSchema = new mongoose.Schema({
    club_id: {type: Schema.Types.ObjectId, ref:'clubs'},
    name: String,
    description: String,
    date: Date
});

var Events = mongoose.model('events', eventSchema);
module.exports.Events = Events;
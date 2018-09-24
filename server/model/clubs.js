import mongoose from "mongoose";
import User from './users'

let ClubSchema = new mongoose.Schema({
    name: String,
    type: String,
    university: String,
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
    created: {
        type: Date,
        default: Date.now, 
      },
});

let Clubs = mongoose.model('Club',ClubSchema);

module.exports = Clubs;

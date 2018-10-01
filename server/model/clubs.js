import mongoose from "mongoose";
import User from './users'

let ClubSchema = new mongoose.Schema({
    name: {
      type: String,
      required:[true, 'Club name can not be blank'],
      trim: true
    },
    type: {
      type: String,
      required: [true, 'University type can not be blank'],
      trim:  true
    },
    university: {
      type: String,
      required:[true, 'University field cannot be blank'],
      trim: true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
    inviteLink: {
      type: String,
    },
    created: {
        type: Date,
        default: Date.now, 
      },
});

let Clubs = mongoose.model('Club',ClubSchema);

module.exports = Clubs;

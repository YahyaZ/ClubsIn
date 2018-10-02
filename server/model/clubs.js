import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
    link: {
      type: String,
    }
});

ClubSchema.pre('save', function (next) {
  var club = this;
  bcrypt.hash(club._id.toString(), 3, function (err, hash) {
    if (err) {
      return next(err);
    }
    club.link = hash.substring(3, 10);
    next();
  })
});

let Clubs = mongoose.model('Club',ClubSchema);

module.exports = Clubs;

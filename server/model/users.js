/**
 * Module providing User Model
 * @module UserSchema
 */

import mongoose from "mongoose";
import bcrypt from 'bcrypt';

/**
 * Creates the User schema
 */
let UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required:[true, 'First Name can not be blank'],
      trim: true,
    },
    lastName: {
      type: String,
      required:[true, 'Last Name can not be blank'],
      trim: true,
    },
    email: {
      type: String,
      lowercase:true,
      required:[true, 'Email Can not be blank'],
      trim: true,
      unique: true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true,
    },
    clubs:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club'
    }],
    created: {
      type: Date,
      default: Date.now, 
    }
});


/**
 * Authenticates the Inputted details against the database
 * @param {String} email - Input Email to check against database
 * @param {String} password - Input Password to check against database
 * @param {Function} callback - Callback function with the User
 * @returns {Object} Authenticated User
 */
UserSchema.statics.authenticate = function (email, password, callback) {
  // Finds the User based on the email
    User.findOne({ email: email })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          // User can not be found
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        // Use bcrypt to compare password with password from db
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }
  
  /**
   * Before user is saved to database, use bcrypt to hash it.
   * @param {Function} next - Express object to go to next function
   */
  UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password,10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

  UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }
  
var User = mongoose.model('User', UserSchema);
module.exports = User;
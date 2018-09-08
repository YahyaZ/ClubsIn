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
    firstName: String,
    lastName: String,
    email: {
      type: String,
      lowercase:true,
    },
    password: String
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

  
var User = mongoose.model('User', UserSchema);
module.exports.User = User;
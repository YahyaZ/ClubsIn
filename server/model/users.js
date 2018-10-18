/**
 * Module providing User Model
 * @module UserSchema
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * User schema that defines the structure of how user data would look in the database
 */
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name can not be blank'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name can not be blank'],
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email Can not be blank'],
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
    },
    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
    }],
    created: {
        type: Date,
        default: Date.now,
    },
});


/**
 * Authenticates the Inputted details against the database
 * @param {String} email - Input Email to check against database
 * @param {String} password - Input Password to check against database
 * @param {Function} callback - Callback function with the User
 * @returns {Object} Authenticated User
 */
UserSchema.statics.authenticate = (email, password, callback) => {
    // Finds the User based on the email
    User.findOne({ email })
        .exec((error, user) => {
            if (error) {
                return callback(error);
            }

            if (!user) {
                // User can not be found
                const err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            // Use bcrypt to compare password with password from db
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    return callback(null, user);
                }
                return callback();
            });
        });
};

/**
 * Before user is saved to database, use bcrypt to hash it.
 * @param {Function} next - Express object to go to next function
 */
UserSchema.pre('save', function encrypt(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

/**
 * For security purposes removes the password from the json before toJSON() is called
 */
UserSchema.methods.toJSON = function toJson() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

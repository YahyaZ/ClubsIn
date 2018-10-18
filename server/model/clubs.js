import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Club schema that defines the structure of how Club data would look in the database
 */
const ClubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Club name can not be blank'],
        trim: true,
    },
    type: {
        type: String,
        required: [true, 'University type can not be blank'],
        trim: true,
    },
    university: {
        type: String,
        required: [true, 'University field cannot be blank'],
        trim: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    },
});

/**
 * Before club is saved to database, use bcrypt to has it.
 * @param {Function} next - Express object to go to next function
 */
ClubSchema.pre('save', function encrypt(next) {
    const club = this;
    bcrypt.hash(club._id.toString(), 3, (err, hash) => {
        if (err) {
            return next(err);
        }
        club.link = hash.substring(3, 10);
        next();
    });
});

const Clubs = mongoose.model('Club', ClubSchema);

module.exports = Clubs;

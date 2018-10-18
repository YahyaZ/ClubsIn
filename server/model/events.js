import mongoose from 'mongoose';

/**
 * Event schema that defines the structure of how event data would look in the database
 */
const eventSchema = new mongoose.Schema({
    club_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
    name: {
        type: String,
        required: [true, 'Event name cannot be blank'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'University type cannot be blank'],
        trime: true,
    },
    date: {
        type: Date,
        required: [true, 'Date for event cannot be blank'],
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Created by field cannot be blank'],
    },
    last_modified: Date,
});

const Events = mongoose.model('events', eventSchema);
module.exports = Events;

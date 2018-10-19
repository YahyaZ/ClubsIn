import mongoose from 'mongoose';
import Events from '../model/events';
import Users from '../model/users';
import ClubService from './clubs';
import { createError, errorMessages, successMessages } from './userErrorUtils';

/**
 * Returns all events
 * @param {Object} res
 */
function getAllEvents(req, res, next) {
    Events.find((err, events) => {
        if (err) return next(err);
        return res.json(events);
    });
}

/**
 * Get events with Club ID
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function getEventsByClubId(req, res, next) {
    // match event with club id,
    // then join tasks that have event_id into new property 'tasks'
    Events.aggregate([
        { $match: { club_id: mongoose.Types.ObjectId(req.params.id) } },
        {
            $lookup: {
                from: 'tasks',
                localField: '_id',
                foreignField: 'event_id',
                as: 'tasks',
            },
        },
    ], async (err, events) => {
        if (err) next(err);
        const userEvents = await getUserEvents(events, next);
        res.json(userEvents);
    });
}

/**
 * Async call to mongoose to get users
 * that have tasks within an event
 * @param {Event} events
 * @param {Object} next
 */
async function getUserEvents(events, next) {
    try {
        await Promise.all(events.map(async (event) => {
            const usersPromise = [];
            for (let taskIndex = 0; taskIndex < event.tasks.length; taskIndex++) {
                for (let userIndex = 0; userIndex < event.tasks[taskIndex].assignee.length;
                    userIndex++) {
                    usersPromise.push(
                        Users.findOne({ _id: event.tasks[taskIndex].assignee[userIndex] }).exec(),
                    );
                }
            }
            const foundUsers = await Promise.all(usersPromise);
            const users = [];
            for (let i = 0; i < foundUsers.length; i++) {
                if (!users.find(user => user._id.equals(foundUsers[i]._id))) {
                    users.push(foundUsers[i]);
                }
            }
            event.users = users;
        }));
    } catch (err) {
        next(err);
    }

    return events;
}

/**
 * Adds a new event object into the DB
 * @param {Object} req
 * @param {Object} res
 */
function addEvent(req, res, next) {
    const {
        clubId,
        name,
        description,
        date,
        createdBy,
    } = req.body;
    if (clubId
        && name
        && description
        && date
        && createdBy) {
        const eventData = {
            club_id: clubId,
            name,
            description,
            date,
            created_by: createdBy,
        };

        Events.create(eventData, (err, event) => {
            if (err) next(err);
            else { return res.status(200).json(eventData); }
        });
    } else {
        res.status(400).json({ error: errorMessages.MISSING_FIELDS });
    }
}

/**
 * Updates the value of an event based on id
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function updateEvent(req, res, next) {
    if (req.body._id && req.body.name && req.body.description && req.body.date) {
        Events.findOneAndUpdate({ _id: req.body._id }, {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            last_modified: new Date(),
        }, (err) => {
            if (err) createError(errorMessages.EVENT_NOT_FOUND, 404);
            return res.status(200).json({ message: successMessages.EVENT_UPDATED });
        });
    } else {
        res.status(400).json({ error: errorMessages.MISSING_FIELDS });
    }
}

/**
 * Finds a single event based on parameter
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function findEvent(req, res, next) {
    Events.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            err.status = 404;
            next(err);
        } else {
            res.json(event);
        }
    });
}

/**
 * Deletes a single event based request parameter id
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function deleteEvent(req, res, next) {
    Events.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (err) next(err);
        res.status(204);
    });
}

/**
 * Returns events which are set in a future date using
 * the id stored in session
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function getUpcomingEvents(req, res, next) {
    const { userId } = req.session;
    const limit = parseInt(req.query.limit, 10) || 5;
    ClubService.getClubsByUserId(userId, '', (clubs) => {
        const clubArray = clubs.map(club => club._id);
        Events.find({
            club_id: { $in: clubArray },
            date: { $gte: new Date() },
        }).sort([['date', 1]])
            .limit(limit)
            .populate('club_id', 'name')
            .exec((err, events) => {
                if (err) next(err);
                res.json(events);
            });
    });
}

module.exports = {
    getAllEvents,
    getEventsByClubId,
    addEvent,
    findEvent,
    deleteEvent,
    updateEvent,
    getUpcomingEvents,
};

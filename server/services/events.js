import mongoose from 'mongoose';
import Events from '../model/events';
import Users from '../model/users';
import ClubService from './clubs';

/**
 * Returns all events
 * @param {Object} req 
 * @param {Object} res 
 */
function getAllEvents(req, res) {
    Events.find(function (err, events) {
        if(err) return console.error(err);
        res.json(events);
    })
}

/**
 * Get events with Club ID
 * @param {Object} req
 * @param {Object} res
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
                as: 'tasks'
            }
        }
    ], async (err, events) => {
        if (err) next(err);
        const userEvents = await getUserEvents(events, next);
        res.json(userEvents);
    });
}

/**
 * Async call to mongoose to get users
 * that have tasks within an event
 */
async function getUserEvents(events, next) {
    try {
        await Promise.all(events.map(async (event) => {
            let users = [];
            for (const taskIndex in event.tasks) {
                for (const userIndex in event.tasks[taskIndex].assignee) {
                    const userDetails = await Users.findOne({_id: event.tasks[taskIndex].assignee[userIndex] }).exec();
                    if (userDetails 
                        && !users.find(user => user._id.equals(userDetails._id))) {
                        users.push(userDetails);
                    }
                }
            }
            console.log(users);
            event.users = users;
        }));
    } catch(err) {
        next(err)
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
    console.log(req.body);
    if(clubId
        && name 
        && description
        && date
        && createdBy) {
        var eventData = {
            club_id: clubId,
            name: name,
            description: description,
            date: date,
            created_by: createdBy,
        }

        Events.create(eventData, (err, event) =>{
            if(err) next(err);
            else {return res.status(200).json(eventData);}
        })
    } else {
        res.status(400).json({"error": "All fields required"})
    }
}

/**
 * Updates the value of an event based on id
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function updateEvent(req,res,next){
    if(res.body._id && res.body.name && res.body.description && res.body.date){
        Events.findOneAndUpdate({_id: res.body._id}, {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            last_modified: Date.now
        }, (err) => {
            if(err){
                var error = new Error("Event not found");
                error.status = 404;
                return next(error);
            }
            return res.status(200).json({"message": "Event updated"});
        })
    } else {
        res.status(400).json({"error": "All fields required"})
    }

}

/**
 * Finds a single event based on parameter
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function findEvent(req, res, next) {
    Events.findOne({_id: req.params.id}, (err, event) => {
        if(err) {
            err.status = 404;
            next(err);
        } else { 
            res.json(event);
        }
    })
}

/**
 * Deletes a single event based request parameter id
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function deleteEvent(req, res, next) {
    Events.findOneAndDelete({_id: req.params.id}, (err) => {
        if(err) next(err);
        res.status(204);
    })
}


function getUpcomingEvents(req, res, next){
    let userId = req.session.userId;
    ClubService.getClubsByUserId(userId,"",function(clubs){
        let clubArray = clubs.map(function(club){
            return club._id;
        })
        Events.find({club_id: {$in: clubArray}}, function(err, events){
            if(err) next (err);
            res.json(events);
        })
    })

}
module.exports = {
    getAllEvents: getAllEvents,
    getEventsByClubId: getEventsByClubId,
    addEvent: addEvent,
    findEvent: findEvent,
    deleteEvent: deleteEvent,
    updateEvent: updateEvent,
    getUpcomingEvents: getUpcomingEvents,
}
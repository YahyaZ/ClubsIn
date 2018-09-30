import Events from '../model/events';
import mongoose from 'mongoose';
import Tasks from '../model/tasks';

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
    Events.find({club_id: req.params.id}, function(err, events) {
        if (err) return next(err);
        res.json(events);
    })
}

/**
 * Get events with Club ID that the user has tasks in
 */
function getUserEventsByClubId(req, res, next) {
    const { clubId, userId } = req.params;
    // Find all events with club id, and return it with an extra property
    // 'event_tasks' which contains the events tasks
    Events.aggregate([
        { $match: { club_id: mongoose.Types.ObjectId(clubId) } },
        {
            $lookup: {
                from: 'tasks',
                localField: '_id',
                foreignField: 'event_id',
                as: 'event_tasks'
            }
        }
    ]).then((events) => {
        // loop over the tasks to find if a task contains the current user
        const userEvents = events.reduce((result, event) => {
            // event has tasks
            if (event.event_tasks) {
                event.event_tasks.forEach(task => {
                    task.assignee.forEach(user => {
                        // user has a task and the event hasn't already been added
                        if (user._id.equals(userId)
                        && !result.find(e => e._id === event._id)) {
                            result.push(event);
                        }
                    });
                });
            }
            return result;
        }, []);
        res.json(userEvents);
    }).catch(err => {
        next(err);
    });
}

/**
 * Adds a new event object into the DB
 * @param {Object} req 
 * @param {Object} res 
 */
function addEvent(req, res, next) {
    if(req.body.clubId && 
    req.body.name && 
    req.body.description && 
    req.body.date &&
    req.body.createdBy){
        var eventData = {
            club_id: req.body.clubId,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            created_by: req.body.createdBy,
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

module.exports = {
    getAllEvents: getAllEvents,
    getEventsByClubId: getEventsByClubId,
    getUserEventsByClubId: getUserEventsByClubId,
    addEvent: addEvent,
    findEvent: findEvent,
    deleteEvent: deleteEvent,
    updateEvent: updateEvent
}
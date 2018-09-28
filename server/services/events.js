import { Events } from '../model/events';

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
 * Adds a new event object into the DB
 * @param {Object} req 
 * @param {Object} res 
 */
function addEvent(req, res) {
    if(req.body.clubId && 
    req.body.name && 
    req.body.description && 
    req.body.date){
        var eventData = {
            club_id: req.body.clubId,
            name: req.body.name,
            description: req.body.description,
            date: req.body.date
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
    addEvent: addEvent,
    findEvent: findEvent,
    deleteEvent: deleteEvent,
    updateEvent: updateEvent
}
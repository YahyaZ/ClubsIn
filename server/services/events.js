import { Events } from '../model/events';

//FindAll
function getAllEvents(req, res) {
    Events.find(function (err, events) {
        if(err) return console.error(err);
        res.json(events);
    })
}

//Add User
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
            if(err) console.error(err);
            else {return res.json(eventData);}
        })
    } else {
        res.status(400).json({"error": "All fields required"})
    }
}

//TODO
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
    deleteEvent: deleteEvent
}
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
function findEvent(req, res) {
    Events.findOne({})
}


module.exports = {
    getAllEvents: getAllEvents,
    addEvent: addEvent
}
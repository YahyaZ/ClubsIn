import { Club } from '../model/clubs';

//Findall
function getClubs(res){
    clubs.find(function(err, clubs){
        if(err) return console.error(err);
        res.json(clubs);
    })
}

/**
 * This function is mainly used when trying to find a club to join for newly registered users
 */
function findClub(res,req){
    clubs.findOne({name: req.body.name, university: req.body.university},
        (err, doc) => {
        if(err) console.error(err);
        res.json(doc);
    });
}

function findClubById(res,req, next){
    clubs.findOne({_id: req.params.id},(err, doc) => {
        if(err) next(err)
        res.json(doc);
    });
}

//Create
function createClub(req, res){
    new clubs({name: req.body.name, type: req.body.type, university: req.body.university, events: req.body.events })
    .save(function(err){
        if(err) console.error(err);
        res.json(`Success`);
    });
}

module.exports = {
    getClubs = getClubs,
    findClub = findClub,
    createClub = createClub,
    findClubById = findClubById
}
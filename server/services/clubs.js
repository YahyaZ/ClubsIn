import Club from '../model/clubs';

function createClub(req, res, next) {
    if(req.body.clubName && req.body.clubType && req.body.university){
        var clubData = {
            name: req.body.clubName,
            type: req.body.clubType,
            university: req.body.university,
        }
    
        // Checks if the club is existing or not, if it doesnt, add it
        Club.findOne({ name: clubData.name, university: clubData.university }, function (err, club) {
            if (err) {
                console.log(err);
            }
            // Club Exists, so return Club Already exists
            if (club) {
                res.status(400).json({ "error": "Club Already Exists" })
            } else {
                // No club is found, so create it
                Club.create(clubData, function (error, club) {
                    if (error) {
                        error.status = 400;
                        return next(error);
                    } else {
                        req.session.clubId = club._id;
                        return res.json(club)
                    }
                });
            }
        });
    } else {
        res.status(200).json({"error": "All Fields required"})
    }
}


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
    if(req.body.name && req.body.university){
        clubs.findOne({name: req.body.name, university: req.body.university},
            (err, doc) => {
            if(err) console.error(err);
            res.json(doc);
        });
    } else {
        res.status(200).json({"error": "Fields missing"})
    }
}


function findClubById(res,req, next){
    if(req.body.id){
        clubs.findOne({_id: req.params.id},(err, doc) => {
            if(err) next(err)
            res.status(200).json(doc);
        });
    } else {
        res.status(400).json({"error": "ID not provided"})
    }
}

//Create
function createClub(req, res, next){
    if(req.body.name && req,body.type && req.body.university && req.body.events){
        new clubs({name: req.body.name, type: req.body.type, university: req.body.university, events: req.body.events })
        .save(function(err){
            if(err) console.error(err);
            res.json(`Success`);
        });
    } else {
        res.status(400).json({"error": "All fields required"})
    }
}

function updateClub(req,res,next) {
    if(req.body.id){
        Clubs.findOneAndUpdate({_id: req.body._id}, {
            name: req.body.name,
            type: req.body.type,
            university: req.body.university,
            users: JSON.parse(req.body.events)
        }, (err, club) =>{
            if(err){
                err.status = 404;
                next(err);
            }
            res.status(200).json(club);
        })
    } else {
        res.status(400).json({"error":"ID not found"}) 
    }
}

module.exports = {
    getClubs : getClubs,
    findClub : findClub,
    createClub : createClub,
    findClubById : findClubById,
    createClub: createClub,
    updateClub: updateClub
}

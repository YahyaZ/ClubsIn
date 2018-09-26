import Club from '../model/clubs';

function createClub(req, res, next) {
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

function updateClub(req,res,next) {
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
}

module.exports = {
    getClubs : getClubs,
    findClub : findClub,
    createClub : createClub,
    findClubById : findClubById,
    createClub: createClub,
    updateClub: updateClub
}

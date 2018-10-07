import Clubs from '../model/clubs';
import UserService from './users';

/**
 * Function communicates to create a new club file in db
 * based on body parameters in by a POST request
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function createClub(req, res, next) {
    if(req.body.name && req.body.type && req.body.university){
        var clubData = {
            name: req.body.name,
            type: req.body.type,
            university: req.body.university,
            users: [req.session.userId],
        }
    
        // Checks if the club is existing or not, if it doesnt, add it
        Clubs.findOne({ name: clubData.name, university: clubData.university }, function (err, club) {
            if (err) {
                console.log(err);
            }
            // Club Exists, so return Club Already exists
            if (club) {
                res.status(400).json({ "error": "Club Already Exists" })
            } else {
                // No club is found, so create it
                Clubs.create(clubData, function (error, club) {
                    if (error) {
                        error.status = 400;
                        return next(error);
                    } else {
                        UserService.addUserToClub(req.session.userId, club._id)
                        req.session.clubId = club._id;
                        return res.json(club)
                    }
                });
            }
        });
    } else {
        res.status(400).json({"error": "All Fields required"})
    }
}


/**
 * Adds a user to a club
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function addUserToClub(req, res, next) {
    if(req.body.inviteCode){
        console.log(req.body.inviteCode, req.session.userId);
        // Checks if the club is existing or not, if it doesnt, add it
        Clubs.findOneAndUpdate({$and: [{link: req.body.inviteCode},{users: {$ne:req.session.userId}}]},{
            $push: {users: req.session.userId}
        }, function (err, club) {
            console.log('Added');
            if (err) {
                console.log(err);
            }
            // Club Exists, so return Club Already exists
            if (club) {
                UserService.addUserToClub(req.session.userId, club._id)
                req.session.clubId = club._id;
                return res.json(club)
            } else {
                // No club is found, Invalid Link
                res.status(404).json({"error": "Invite Link Invalid"})
            }
        });
    } else {
        res.status(400).json({"error": "All Fields required"})
    }
}

/**
 * Function simply queries to return all found club files in db
 * Called by a GET request
 * @param {Object} res 
 */
function getClubs(req, res, next){
    var options = req.query.q || null;
    getClubsByUserId(req.session.userId, options, function(clubs){
        res.json(clubs);
    })
}

function getClubsByUserId(userId, options, callback){
    UserService.getUser(userId, function(err, currUser){
        if(err) next(err);
        Clubs.find({_id:{$in: currUser.clubs}},options,function(err, clubs){
            if(err) next(err);
            callback(clubs);
        })
    })
}

/**
 * This function is mainly used when trying to find a club to join for 
 * newly registered users
 * Called by a POST request
 * @param {Object} res 
 * @param {Object} req 
 */
function findClub(res,req, next){
    if(req.body.name && req.body.university){
        Clubs.findOne({name: req.body.name, university: req.body.university},
            (err, doc) => {
            if(err) next(err);
            res.json(doc);
        });
    } else {
        res.status(200).json({"error": "Fields missing"})
    }
}

/**
 * Tries to find a single club file based on a provided _id object
 * GET method
 * @param {Object} res 
 * @param {Object} req 
 * @param {Object} next 
 */
function findClubById(req, res, next){
    if(req.params.id){
        Clubs.findOne({_id: req.params.id},(err, doc) => {
            if(err) next(err)
            res.status(200).json(doc);
        });
    } else {
        res.status(400).json({"error": "ID not provided"})
    }
}

/**
 * Gets an array of club members
 * GET method
 */
function getClubMembers(req, res, next) {
    if (req.params.id) {
        Clubs.findOne({_id: req.params.id})
            .populate('users')
            .exec((err, doc) => {
                if (err) next(err);
                res.json(doc.users);
            })
    }
}

/**
 * Retrieves a club by _id and updates it's contents based on parameters
 * POST method
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
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
    updateClub: updateClub,
    addUserToClub: addUserToClub,
    getClubsByUserId: getClubsByUserId,
    getClubMembers: getClubMembers,
}

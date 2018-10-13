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
    if (req.body.name && req.body.type && req.body.university) {
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
        res.status(400).json({ "error": "Please fill out all fields" })
    }
}


/**
 * Adds a user to a club
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function addUserToClub(req, res, next) {
    if (req.body.inviteCode) {
        // Checks if the club is existing or not, if it doesnt, add it
        Clubs.findOne({ link: req.body.inviteCode }, function (err, club) {
            if (err) {
                return next(err);
            }
            // Club Exists, Check if user is in club
            if (club) {
                if (!club.users.includes(req.session.userId)){
                    club.users.push(req.session.userId);
                    club.save(function(err,club){
                        if (err) {
                            return next(err);
                        }

                        UserService.addUserToClub(req.session.userId, club._id)
                        req.session.clubId = club._id;
                        return res.json(club)
                    });
                } else{
                    // User already is in club
                    res.status(400).json({ "error": "User is already in club" });
                }
            } else {
                // No club is found, Invalid Link
                res.status(404).json({ "error": "Invite Link Invalid" });
            }
        });
    } else {
        res.status(400).json({ "error": "Please fill out all fields" });
    }
}

/**
 * Function simply queries to return all found club files in db
 * Called by a GET request
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function getClubs(req, res, next) {
    var options = req.query.q || null;
    getClubsByUserId(req.session.userId, options, function (clubs) {
        Clubs.find({_id: clubs},options, function(err, clubs){
            if(err) return next(err);
            res.json(clubs);
        });
    });
}

/**
 * Provides an id through a post body method which is queried into
 * the database to find an array of club id's
 * POST METHOD
 * @param {*} userId 
 * @param {*} options 
 * @param {*} callback 
 */
function getClubsByUserId(userId, options, callback) {
    UserService.getUser(userId, function (err, currUser) {
        if (err) next(err);
        callback(currUser.clubs);
    });
}

/**
 * Tries to find a single club file based on a provided _id object
 * GET method
 * @param {Object} res 
 * @param {Object} req 
 * @param {Object} next 
 */
function findClubById(req, res, next) {
    if (req.params.id) {
        Clubs.findOne({ _id: req.params.id }, (err, doc) => {
            if (err) next(err)
            res.status(200).json(doc);
        });
    } else {
        res.status(400).json({ "error": "ID not provided" })
    }
}

/**
 * Gets an array of club members
 * GET method
 * @param {Object} res 
 * @param {Object} req 
 * @param {Object} next 
 */
function getClubMembers(req, res, next) {
    if (req.params.id) {
        Clubs.findOne({ _id: req.params.id })
            .populate('users')
            .exec((err, doc) => {
                if (err) next(err);
                res.json(doc.users);
            })
    }
}


module.exports = {
    getClubs: getClubs,
    createClub: createClub,
    findClubById: findClubById,
    addUserToClub: addUserToClub,
    getClubsByUserId: getClubsByUserId,
    getClubMembers: getClubMembers,
}

import Clubs from '../model/clubs';
import UserService from './users';
import { errorMessages } from './userErrorUtils';
/**
 * Function communicates to create a new club file in db
 * based on body parameters in by a POST request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function createClub(req, res, next) {
    if (req.body.name && req.body.type && req.body.university) {
        const clubData = {
            name: req.body.name,
            type: req.body.type,
            university: req.body.university,
            users: [req.session.userId],
        };

        // Checks if the club is existing or not, if it doesnt, add it
        Clubs.findOne({ name: clubData.name, university: clubData.university }, (err, club) => {
            if (err) {
                return next(err);
            }
            // Club Exists, so return Club Already exists
            if (club) {
                return res.status(400).json({ error: errorMessages.CLUB_EXISTS });
            }
            // No club is found, so create it
            Clubs.create(clubData, (error, currentClub) => {
                if (error) {
                    return next(error);
                }
                UserService.addUserToClub(req.session.userId, currentClub._id);
                req.session.clubId = currentClub._id;
                return res.json(currentClub);
            });
        });
    } else {
        return res.status(400).json({ error: errorMessages.MISSING_FIELDS });
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
        Clubs.findOne({ link: req.body.inviteCode }, (err, club) => {
            if (err) {
                return next(err);
            }
            // Club Exists, Check if user is in club
            if (club) {
                if (!club.users.includes(req.session.userId)) {
                    club.users.push(req.session.userId);
                    club.save((saveError, currentClub) => {
                        if (saveError) {
                            return next(err);
                        }

                        UserService.addUserToClub(req.session.userId, currentClub._id);
                        req.session.clubId = currentClub._id;
                        return res.json(currentClub);
                    });
                } else {
                    // User already is in club
                    res.status(400).json({ error: errorMessages.USER_IN_CLUB });
                }
            } else {
                // No club is found, Invalid Link
                res.status(404).json({ error: errorMessages.INVALID_LINK });
            }
        });
    } else {
        res.status(400).json({ error: errorMessages.MISSING_FIELDS });
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
    const options = req.query.q || null;
    getClubsByUserId(req.session.userId, next, (clubs) => {
        Clubs.find({ _id: clubs }, options, (err, foundClubs) => {
            if (err) return next(err);
            res.json(foundClubs);
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
function getClubsByUserId(userId, next, callback) {
    UserService.getUser(userId, (err, currUser) => {
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
            if (err) next(err);
            res.status(200).json(doc);
        });
    } else {
        res.status(400).json({ error: errorMessages.NO_ID });
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
            });
    }
}


module.exports = {
    getClubs,
    createClub,
    findClubById,
    addUserToClub,
    getClubsByUserId,
    getClubMembers,
};

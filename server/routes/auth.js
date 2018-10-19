/**
 * Serves authentication requests
 * @module Authentication
 */
import ClubService from '../services/clubs';

/**
 * Check if the user is logged in or not
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Object} next - Express next middleware function
 */
function requiresLogin(req, res, next) {
    // Checks if there is a session present and if there is a user associated with that session
    if (req.session && req.session.userId) {
        next();
    } else {
        // User is not authenticated, throw an error
        next(handleUnauthorisedAccess());
    }
}

/**
 * Validation function which detects if the api call being made is from an authorised
 * user who is apart of the club being called
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function requiresUserClub(req, res, next) {
    let authorised = false;
    if (req.session.userId && req.params.id) {
        // Get all the clubs from the current user
        ClubService.getClubsByUserId(req.session.userId, '_id', (clubs) => {
            clubs.forEach((club) => {
                if (club._id.toString() === req.params.id) {
                    // if the id is in the clubs array, then it is authorised
                    authorised = true;
                }
            });
            if (authorised) {
                next();
            } else {
                next(handleUnauthorisedAccess());
            }
        });
    }
}

function handleUnauthorisedAccess() {
    const err = new Error('You are unauthorised to see this page');
    err.status = 401;
    return err;
}

module.exports = {
    requiresLogin,
    requiresUserClub,
};

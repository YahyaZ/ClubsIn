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
    return next();
  }
  else {
    // User is not authenticated, throw an error
   handleUnauthorisedAccess(next);
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
    ClubService.getClubsByUserId(req.session.userId, '_id', function (clubs) {
      clubs.forEach(club => {
        if (club._id == req.params.id) {
          authorised = true;
        }
      });

      if (authorised) {
        next();
      } else {
        handleUnauthorisedAccess(next);
      }
    })
  }
}

function handleUnauthorisedAccess(next){
  const err = new Error('You are unauthorised to see this page');
  err.status = 401;
  next(err);
}

module.exports = {
  requiresLogin: requiresLogin,
  requiresUserClub: requiresUserClub,
}
/**
 * Module providing User Services
 * @module UserServices
 */
import User from '../model/users';
import {createError, errorMessages} from './userErrorUtils';
/**
 * Find the user based on the current session
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 */
function findUser(req, res, next) {
    const id = req.session.userId;

    // Gets the User based on the id provided by the session
    getUser(id,
        (err, user) => {
            if (err || user == null) {
                next(createError(errorMessages.USER_NOT_FOUND, 400));
            }
            res.json(user);
        });
}

/**
 * Returns a single user from the database based on id in url parameter
 * GET METHOD
 * @param {Object} id
 * @param {Object} callback
 */
function getUser(id, callback) {
    return User.findOne({ _id: id }, callback);
}

/**
 * Adds the new User to the database based on body parameters
 * POST METHOD
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Object} next - Express next middleware function
 */
function signUp(req, res, next) {
    // Checks if the passwords match, if it doesnt, return a 400 error
    if (req.body.password !== req.body.passwordConf) {
        next(createError(errorMessages.PASSWORD_MISMATCH, 400));
    } else // Checks if all the necessary fields are there
    if (req.body.email
    && req.body.firstName
    && req.body.lastName
    && req.body.password
    && req.body.passwordConf
    ) {
        const userData = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        };

        // Checks if the user is existing or not, if it doesnt, add it
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                console.log(err);
                next(err);
            }
            // User Exists, so return User Already exists
            if (user) {
                next(createError(errorMessages.EXISTING_USER, 400));
            } else {
                // No user is found, so create it
                const newUser = new User(userData);
                newUser.save((error) => {
                    if (error) {
                        next(createError(error, 400));
                    } else {
                        req.session.userId = newUser._id;
                        res.send(newUser);
                    }
                });
            }
        });
    } else {
        next(createError(errorMessages.MISSING_FIELDS, 400));
    }
}


/**
 * Logs the User in and adds a session
 * POST METHOD
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Object} next - Express next middleware function
 */
function login(req, res, next) {
    // Checks if the Email and Password is sent
    if (req.body.email && req.body.password) {
    // Authenticaties the user
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                res.status(400).json({ error: errorMessages.INCORRECT_EMAIL_PASS });
            } else {
                // Sets the Session Usedid
                req.session.userId = user._id;
                res.status(200).json(user);
            }
        });
    } else {
        next(createError(errorMessages.MISSING_FIELDS, 400));
    }
}

/**
 * Authenticates user and then changes password of said user
 * POST METHOD
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function updatePassword(req, res, next) {
    if (req.body.newPassword && req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                next(createError(errorMessages.INCORRECT_EMAIL_PASS, 400));
            } else {
                const updateUser = user;
                updateUser.password = req.body.newPassword;
                user.save((err, updatedUser) => {
                    if (err) next(err);
                    res.status(200).json(updatedUser);
                });
            }
        });
    } else if (req.body.newPassword !== req.body.confirmPassword) {
        next(createError(errorMessages.PASSWORD_MISMATCH, 400));
    } else {
        next(createError(errorMessages.MISSING_FIELDS, 400));
    }
}

/**
 * Ends current session of logged in user
 * GET METHOD
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function logout(req, res, next) {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                next(err);
            }
            res.status(204).send();
        });
    }
}

/**
 * Finds a user and then adds new club id to their array of clubs
 * Function called from  ./clubs.js
 * @param {Object} userId
 * @param {Object} clubId
 */
function addUserToClub(userId, clubId) {
    if (userId && clubId) {
        User.findOneAndUpdate(
            { _id: userId },
            { $push: { clubs: clubId } }, err => err,
        );
        return true;
    }
    return false;
}

module.exports = {
    findUser,
    getUser,
    signUp,
    login,
    logout,
    addUserToClub,
    updatePassword,
};

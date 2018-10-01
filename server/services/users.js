/**
 * Module providing User Services
 * @module UserServices
 */
import User from '../model/users';

/**
 * Find the user based on the current session
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 */
function findUser(req, res) {
  let id = req.session.userId;

  // Gets the User based on the id provided by the session
  return User.findOne({ _id: id },
    function (err, user) {
      if (err) {
        return res.status(404).json({
          msg: 'User does not exist in the dBase, please' +
            ' sign up to login as a user'
        })
      }
      if (user == null) {
        return res.json({
          msg: 'User does not exist in the dBase, please' +
            ' sign up to login as a user'
        });
      }
      return res.json(user);
    });
}

/**
 * Returns all the Users in the database.
 * This is just for testing purposes, must be removed during production deploy
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 */
function getAllUsers(req, res) {
  User.find(function (err, users) {
    if (err) return console.error(err);
    res.json(users);
  })
}

/**
 * Adds the new User to the database
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Object} next - Express next middleware function
 */
function signUp(req, res, next) {
  // Checks if the passwords match, if it doesnt, return a 400 error
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.json({ "error": "passwords dont match" });
    return next(err);
  }

  // Checks if all the necessary fields are there
  if (req.body.email &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.password &&
    req.body.passwordConf
  ) {

    var userData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    // Checks if the user is existing or not, if it doesnt, add it
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        console.log(err);
      }
      // User Exists, so return User Already exists
      if (user) {
        res.status(400).json({ "error": "User Already Exists" })
      } else {
        // No user is found, so create it

        let newUser = new User(userData);
        newUser.save(function (err) {
          if (err) { console.log(err); return next(err); }
          req.session.userId = newUser._id;
          res.send(newUser);

        })
      }
    });
  } else {
    res.status(400).json({ "error": "All fields required." })
  }
}

/**
 * Logs the User in and adds a session
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Object} next - Express next middleware function
 */
function login(req, res, next) {
  // Checks if the Email and Password is sent
  if (req.body.email && req.body.password) {
    // Authenticaties the user
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        res.status(400).json({ "error": "Wrong email or password" })
      } else {
        console.log(user.email + " logged in")
        // Sets the Session Usedid
        req.session.userId = user._id;
        delete user.password;
        res.status(200).json(user);
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
}


function logout(req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        res.status(204).send();


      }
    }
    )
  } else {
    var err = new Error('Session not found');
    err.status = 404;
    return next(err);
  }
}

function addUserToClub(userId, clubId) {
  if (userId && clubId) {
    User.findOneAndUpdate(
      { _id: userId },
      { $push: { clubs: clubId }}, (err,user)=>{
          return err;
      });
      return true;
  }
  return false;
}

module.exports = {
  findUser: findUser,
  getAllUsers: getAllUsers,
  signUp: signUp,
  login: login,
  logout: logout,
  addUserToClub: addUserToClub,
}
import session from 'express-session';

function requiresLogin(req, res, next) {
    console.log(req.session)
    if (req.session && req.session.userId) {
      return next();
    } 
    else {
      var err = new Error('You are unauthorised to see this page');
      err.status = 401;
      next(err);
      //return res.json({"error":"You must be logged in to view this page."})
    }
  }

  module.exports = {
    requiresLogin: requiresLogin,
}
import express from 'express';
import database from '../database-handler';
import { User } from '../model/users';
import jsonwebtoken from 'jsonwebtoken';



let router = express.Router();

/**
 * localhost:3001/api/login
 * call's finduser based on provided parameters
 * MOCK DATA FOR NOW 
 
=============================================================================
router.post('/login', (req, res) =>{
    database.findUser(function(result){
        try {
            res.status(200).json(result);
        }catch(err){
            res.send(`Authentication failed: incorrect details`);
        }
    }, "yahyaZ@hotmail.com", "ilovemalek");
});
=============================================================================
*/

/**
 * localhost:3001/api/signup
 * Registers a user based on provided parameters
 * MOCK DATA
 */

 // =========================================================================
/*router.post('/signup', (req, res) =>{
    var user = req.headers;
    //console.log(JSON.stringify(req.body));
    database.registerUser(function(result){
        res.json(result);
    }, req.body.name, req.body.lastName, req.body.email, req.body.password);
});*/
 // =========================================================================


/**
 * Homepage GET function
 * Returns array of all users for now
 * TODO: Modify functionality to suit homepage
 */
router.get('/', (req, res) => {
    database.getUsers(function(result){
        //get callback then display
        res.send(result);
    })
});


//POST route for updating data
router.post('/signup', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.json({"error":"passwords dont match"});
      return next(err);
    }
  
    if (req.body.email &&
      req.body.firstName &&
      req.body.lastName &&
      req.body.password &&
      req.body.passwordConf) {
  
      var userData = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        passwordConf: req.body.passwordConf,
      }

      User.findOne({email: req.body.email}, function(err, user){
        if(err) {
          console.log(err);
        }
        if(user) {
          res.status(400).json({"error":"User Already Exists"})
        } else {
           console.log('Creating User');
           User.create(userData, function (error, user) {
            if (error) {
              return next(error);
            } else {
              req.session.userId = user._id;
              return res.json(userData)
            }
          });
        }
    });
    } else {
      res.status(400).json({"error":"All fields required."})
    }
  });


  // GET route after registering
router.post('/login', function (req, res, next) {
    if (req.body.email &&
        req.body.password){
            User.authenticate(req.body.email, req.body.password, function (error, user) {
                if (error || !user) {
                  res.status(400).json({"error":"Wrong email or password"})
                } else {
                  let token = jsonwebtoken.sign({id: user._id, email: user.email, firstName: user.firstName}, 'supersecret', {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  req.session.userId = user._id;
                  return res.status(200).json({token: token});
                }
              });
            } else {
              var err = new Error('All fields required.');
              err.status = 400;
              return next(err);
            }
        }
  );

module.exports = router;
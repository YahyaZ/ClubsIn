import express from 'express';
import database from '../database-handler';


let router = express.Router();

/**
 * localhost:3001/api/login
 * call's finduser based on provided parameters
 * MOCK DATA FOR NOW
 */
router.post('/login', (req, res) =>{
    database.findUser(function(result){
        try {
            res.send(`${result.firstName} ${result.lastName}`);
        }catch(err){
            res.send(`Authentication failed: incorrect details`);
        }
    }, "Yahyaiscool@cool.com", "touchmeDaddy");
});

/**
 * localhost:3001/api/signup
 * Registers a user based on provided parameters
 * MOCK DATA
 */
router.post('/signup', (req, res) =>{
    var user = req.headers;
    //console.log(JSON.stringify(req.body));
    database.registerUser(function(result){
        res.send(result);
    }, req.body.name, req.body.lastName, req.body.email, req.body.password);
});

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

module.exports = router;
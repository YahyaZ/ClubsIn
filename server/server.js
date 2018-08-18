import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose, { Model, Schema } from 'mongoose';

const app = express();
const router = express.Router();
const API_PORT = process.env.API_PORT || 3001;

//temporary way to connect our db
mongoose.connect('mongodb://admin:Password123!@ds111562.mlab.com:11562/clubbin');

/**
 * Create a schema for users when connecting to our mongo database
 */
let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

//User collection which handles any retrievals or changes in our user section
let users = mongoose.model('Users', userSchema, 'users');

/**
 * Returns all users within the collection and returns it in a callback (async)
 * @param {*} callback 
 */
let getUsers = function(callback){
    users.find(function(err, userss){
        if(err) return console.error(err);
        //console.log(userss);
        callback(userss);
    })
}

/**
 * Creates a new user based off of our 'userSchema' model
 * saves that with values based off parameters
 * @param {*} callback 
 * @param {*} first 
 * @param {*} last 
 * @param {*} email 
 * @param {*} password 
 */
let registerUser = function(callback, first, last, email, password){
    var newUser = new users({firstName: first, lastName: last, email: email, password: password});
    newUser.save(function (err){
        if(err) callback(err);
        callback(`New user: ${first} ${last} created!`);
    })
}

/**
 * Tries to find a single user within the collection
 * @param {*} callback 
 * @param {*} email 
 * @param {*} password 
 */
let findUser = function(callback, email, password){
    users.findOne({email: email, password: password}, function(err,doc){
        if(err) callback(err);
        callback(doc);
    });
};

/**
 * localhost:3001/api/login
 * call's finduser based on provided parameters
 * MOCK DATA FOR NOW
 */
router.post('/login', (req, res) =>{
    findUser(function(result){
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
    registerUser(function(result){
        res.send(result);
    }, "Yahya", "isCool", "Yahyaiscool@cool.com", "touchmeDaddy");
});

router.get('/', (req, res) => {
    getUsers(function(result){
        //get callback then display
        res.send(result);
    })
    //res.json(getUsers());
    //getUsers();
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose, { Model, Schema } from 'mongoose';

const app = express();
const router = express.Router();
const API_PORT = process.env.API_PORT || 3001;

//temporary way to connect our db
mongoose.connect('mongodb://admin:Password123!@ds111562.mlab.com:11562/clubbin');

//start off with testing basics
let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
let users = mongoose.model('Users', userSchema, 'users');

let getUsers = function(callback){
    users.find(function(err, userss){
        if(err) return console.error(err);
        //console.log(userss);
        callback(userss);
    })
}

let registerUser = function(callback, first, last, email, password){
    var newUser = new users({firstName: first, lastName: last, email: email, password: password});
    newUser.save(function (err){
        if(err) callback(err);
        callback(`New user: ${first} ${last} created!`);
    })
}

let findUser = function(callback, email, password){
    users.findOne({email: email, password: password}, function(err,doc){
        if(err) callback(err);
        callback(doc);
    });
};

router.post('/login', (req, res) =>{
    findUser(function(result){
        try {
            res.send(`${result.firstName} ${result.lastName}`);
        }catch(err){
            res.send(`Authentication failed: incorrect details`);
        }
    }, "Yahyaiscool@cool.com", "touchmeDaddy");
});

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
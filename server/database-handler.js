import mongoose, { Model, Schema } from 'mongoose';
import collectionSchemas from './collection-schemas';

//temporary way to connect our db
mongoose.connect('mongodb://admin:Password123!@ds111562.mlab.com:11562/clubbin');

module.exports.registerUser = registerUser;
module.exports.getUsers = getUsers;
module.exports.findUser = findUser;
module.exports.getClubs = getClubs;
module.exports.createClub = createClub;
module.exports.findClub = findClub;

//DB Schema types and models
let userSchema = collectionSchemas.getUserSchema();
let users = mongoose.model('Users', userSchema , 'users');

let clubSchema = collectionSchemas.getClubSchema();
let clubs = mongoose.model('Clubs', clubSchema, 'clubs');


function getClubs(callback){
    clubs.find(function(err, clubss){
        if(err) return console.error(err);
        callback(clubss);
    })
}

function createClub(callback, name, type, university){
    var club = new clubs({name: name, type: type, university: university});
    club.save(function(err){
        if(err) console.error(err);
        callback(`Club '${name}' created at ${university}`);
    })
}

function findClub(callback, name, university){
    clubs.findOne({name: name, university: university}, function(err, doc){
        if(err) callback(err);
        callback(doc);
    });
}

/**
 * Returns all users within the collection and returns it in a callback (async)
 * @param {*} callback 
 */
function getUsers(callback){
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
function registerUser(callback, first, last, email, password){
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
function findUser(callback, email, password){
    users.findOne({email: email, password: password}, function(err,doc){
        if(err) callback(err);
        callback(doc);
    })
};
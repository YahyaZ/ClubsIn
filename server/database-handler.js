import mongoose, { Model, Schema } from 'mongoose';


//temporary way to connect our db
mongoose.connect('mongodb://admin:Password123!@ds111562.mlab.com:11562/clubbin');

module.exports.registerUser = registerUser;
module.exports.getUsers = getUsers;
module.exports.findUser = findUser;
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
import mongoose, { Model, Schema  } from "mongoose";

module.exports.getUserSchema = getUserSchema;
module.exports.getClubSchema = getClubSchema;

/**
 * Create a schema for users when connecting to our mongo database
 */
let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

/**
 * Club schema
 */
let clubSchema = new mongoose.Schema({
    id: String,
    name: String,
    type: String,
    university: String,
    events: [],
    members: []
});


//Getter functions
function getUserSchema(){
    return userSchema;
}

function getClubSchema(){
    return clubSchema;
}
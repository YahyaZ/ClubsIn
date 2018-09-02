import mongoose, { Model, Schema  } from "mongoose";
let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

function getUserSchema(){
    return userSchema;
}

module.exports.userModel = mongoose.model('Users', userSchema );
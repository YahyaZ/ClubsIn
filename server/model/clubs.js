import mongoose from "mongoose";

let clubSchema = new mongoose.Schema({
    name: String,
    type: String,
    university: String,
    members: []
});
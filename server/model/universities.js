/**
 * Module providing User Model
 * @module UniversitySchema
 */
import mongoose from "mongoose";

/**
 * Creates the Uni schema
 */
let UniSchema = new mongoose.Schema({
    name:String,
    abbreviation:String,
});

  
var University = mongoose.model('Universities', UniSchema);
module.exports = University;
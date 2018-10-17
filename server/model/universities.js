/**
 * Module providing User Model
 * @module UniversitySchema
 */
import mongoose from "mongoose";

/**
 * Uni schema that defines the structure of how uni data would look in the database
 */
let UniSchema = new mongoose.Schema({
    name:String,
    abbreviation:String,
});

  
var University = mongoose.model('Universities', UniSchema);
module.exports = University;
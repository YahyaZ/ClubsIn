import express from 'express';
import database from '../database-handler';


let router = express.Router();

/**
 * localhost:3001/api/clubs
 * retrieves all currently existing clubs
 */
router.get('/', (req, res) =>{
    database.getClubs(function(result){
        res.send(result);
    })
})

/**
 * Creates a club in the database
 * TODO: Add authentication on creating a club. NO DUPLICATES
 */
router.post('/create', (req, res)=> {
    database.createClub(function(result){
        res.send(result);
    }, req.body.name, req.body.type, req.body.university);
})

/**
 * Finds a single club instance in the collection using
 * name and university strings and returns result (error or club details)
 */
router.post('/', (req, res) => {
    database.findClub(function(result){
        try{
            res.send(`${result.name} ${result.university}`);
        } catch(err){res.send(`Club not found`);}
    }, req.body.name, req.body.university);
})

module.exports = router;
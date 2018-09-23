import express from 'express';
import database from '../database-handler';


let router = express.Router();

/**
 * localhost:<>/api/club/
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
            res.send(result);
        } catch(err){res.send(`Club not found`);}
    }, req.body.name, req.body.university);
})

/**
 * Post function handles all event/task updates
 * Pass through id and events array
 */
router.post('/update', (req, res) => {
    database.updateClubEvents( (result)=>{
        try{
            res.send(result);
        } catch(err){res.send(`Update failed`);}
    }, req.body.id, req.body.events )
})

/**
 * return a single club based on id
 * api/club/:clubId
 */
router.get('/:clubId', (req, res) => {
    database.findClubByID( (result)=>{
        try{res.send(result);} catch(err){res.send(`No Club found with the provided id ${req.params.clubId}`)}
    }, req.params.clubId)
    // res.send(req.params.clubId);
})
module.exports = router;
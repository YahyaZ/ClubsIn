import express from 'express';
import database from '../database-handler';
import ClubService from '../services/clubs';
import Club from '../../client/src/containers/Clubs';

let router = express.Router();

/**
 * localhost:<>/api/club/
 * retrieves all currently existing clubs
 */
router.get('/', ClubService.getClubs);

/**
 * Creates a club in the database
 * TODO: Add authentication on creating a club. NO DUPLICATES
 */
router.post('/create', ClubService.createClub);

/**
 * Finds a single club instance in the collection using
 * name and university strings and returns result (error or club details)
 */
router.post('/find', ClubService.findClub);

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
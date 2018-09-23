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
 * return a single club based on id
 * api/club/:clubId
 * 
 *  parameters:
 *   id: id of the requested club
 * 
 *  responses:
 *   404: no club of such id was found
 *   json: JSON format of requested club
 */
router.get('/:clubId', ClubService.findClubById);


module.exports = router;
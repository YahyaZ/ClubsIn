import express from 'express';
import database from '../database-handler';
import clubService from '../services/clubs';
import eventService from '../services/events';


let router = express.Router();

/**
 * localhost:<>/api/club/
 * retrieves all currently existing clubs
 */
router.get('/', clubService.getClubs);

/**
 * Creates a club in the database
 * TODO: Add authentication on creating a club. NO DUPLICATES
 */
router.post('/create', clubService.createClub);

/**
 * Finds a single club instance in the collection using
 * name and university strings and returns result (error or club details)
 */
router.post('/', clubService.findClub);



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
router.get('/:clubId', clubService.findClubById);

/**
 * return events with the clubId
 * api/club/:id/events
 * 
 * parameters:
 *  id: id of the requested club
 * 
 * responses:
 *  404: no club of such id was found
 *  JSON: JSON of all club events
 */
router.get('/:id/events', eventService.getEventsByClubId);

/**
 * TODO: COMMENTING
 */
router.put('/', clubService.updateClub)
module.exports = router;
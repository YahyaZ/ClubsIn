import express from 'express';
import clubService from '../services/clubs';
import eventService from '../services/events';
import { requiresUserClub } from './auth';


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
router.get('/:id', requiresUserClub, clubService.findClubById);

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
router.get('/:id/events',requiresUserClub,  eventService.getEventsByClubId);

router.post('/invite', clubService.addUserToClub)

router.get('/:id/users',requiresUserClub, clubService.getClubMembers);

module.exports = router;
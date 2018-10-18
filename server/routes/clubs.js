import express from 'express';
import clubService from '../services/clubs';
import eventService from '../services/events';
// ignore lint as it does not recognise requiresUserClub for some reason
import { requiresUserClub } from './auth'; // eslint-disable-line


const router = express.Router();

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
router.get('/:id/events', requiresUserClub, eventService.getEventsByClubId);

/**
 * Adds a user to a club
 * /api/club/invite
 *
 * parameters:
 *  inviteCode: An invite code automatically generated for clubs to invite other executives
 *
 * responses:
 *  400: User already exists in the issuing inviteCode club
 *  404: Invite link is invalid
 *  400: All fields are not filled out
 *  200: Json object of the club user was added to
 */
router.post('/invite', clubService.addUserToClub);

/**
 * Gets an array of club members
 * /api/clubs/:id/users
 *
 * parameters:
 *  id: The id of the club which members of are to be returned
 *
 * responses:
 *  200: Array of all users related to that club
 *  404: Club not found
 */
router.get('/:id/users', requiresUserClub, clubService.getClubMembers);

module.exports = router;

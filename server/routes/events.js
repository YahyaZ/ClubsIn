import express from 'express';
import EventService from '../services/events';

let router = express.Router();


/**
 * Get All Events
 */
router.get('/', EventService.getAllEvents)

/**
 * Add Event
 */
router.post('/addEvent', EventService.addEvent);

/**
 * GET METHOD
 *  parameters:
 *    - id: id of the event that is requested
 *  responses:
 *    - 404: No event of such id was found
 *    - json: Event in json format
 */
router.get(':id', EventService.findEvent);

/**
 * DELETE METHOD
 * 
 * parameters:
 *  -id: id of the desired event to be deleted
 * 
 * responses:
 *  - 404: no event of such id was found
 *  - 204: event was deleted
 */
router.delete(':id', EventService.deleteEvent);


module.exports = router;
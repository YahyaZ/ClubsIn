import express from 'express';
import EventService from '../services/events';

let router = express.Router();


/**
 * GET METHOD - Get All Events
 *  parameters: 
 *      -
 *  outputs:
 *      - 200: All events in a JSON format
 *      - 404: No events found
 */
router.get('/', EventService.getAllEvents)

/**
 * POST METHOD - Add Event
 *  parameters:
 *     - club_id: id of the club this event is related to
 *     - name: Name of event
 *     - description: description of event
 *     - date: Date of event
 *  outputs:
 *     - 400: Fields missing
 *     - 404: Event not found in database
 *     - 200: Event data, success
 */
router.post('/', EventService.addEvent);

/**
 * GET METHOD - Get All Events
 *  parameters: 
 *      -
 *  outputs:
 *      - 200: All events in a JSON format
 *      - 404: No events found
 */
router.get('/upcoming', EventService.getUpcomingEvents)


/**
 * GET METHOD
 *  parameters:
 *    - id: id of the event that is requested
 *  responses:
 *    - 404: No event of such id was found
 *    - json: Event in json format
 */

router.get('/:id', EventService.findEvent);



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
router.delete('/:id', EventService.deleteEvent);

/**
 * PUT METHOD - Updates an events details
 *  parameters:
 *     - club_id: id of the club this event is related to
 *     - name: Name of event
 *     - description: description of event
 *     - date: Date of event
 *     - last_modified: last date this event was modified
 *  outputs:
 *     - 404: Event not found in database
 *     - 200: Event data, success
 */
router.put('/', EventService.updateEvent);


module.exports = router;
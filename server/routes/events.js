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


module.exports = router;
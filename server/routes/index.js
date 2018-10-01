/**
 * Middle router to route methods to other routers
 * @module Router
 */
import express from 'express';
import users from './users';
import clubs from './clubs';
import universities from './university';
import auth from './auth';
import events from './events';
import tasks from './tasks';

let router = express.Router();
router.use('/user', users);
router.use('/club',auth.requiresLogin, clubs);
router.use('/university', universities);
router.use('/event', events);
router.use('/task', tasks)



module.exports = router;
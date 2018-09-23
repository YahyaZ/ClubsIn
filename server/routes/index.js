/**
 * Middle router to route methods to other routers
 * @module Router
 */
import express from 'express';
import users from './users';
import clubs from './clubs';
import universities from './university';


let router = express.Router();
router.use('/user', users);
router.use('/club', clubs);
router.use('/university', universities);




module.exports = router;
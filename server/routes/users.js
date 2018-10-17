/**
 * Router for user functions
 * @module UserRouter
 */
import express from 'express';
import UserService from '../services/users';
import { requiresLogin } from './auth'

let router = express.Router();

/**
 * Route to signup users
 * Path: /api/user/signup
 * Method: Post
 *  parameters:
 *  - email: Email of the User
 *  - firstName: First Name of the User
 *  - lastName: Last Name of the User
 *  - password: Password of the User
 *  - passwordConf: Password Confirmation
 * Response:
 *  - 200 - Returns JSON of user data
 *  - 400 - User Already Exists
 *  - 400 - Fields are missing
 *  - 400 - Password does not match with password confirmation
 */
router.post('/signup', UserService.signUp);

/**
 * Route to login a User
 * Path: /api/user/login
 * Method: Post
 *  parameters:
 *  - email: Email of the User
 *  - password: Password of the User
 * Response:
 *  - 200 - Returns JWT token of logged in User
 *  - 400 - Fields are missing
 *  - 400 - Details are incorrect
 */
router.post('/login', UserService.login);

/**
 * Route to get user profile details
 * User needs to be logged in
 * Path: /api/user/profile
 * Method: Get
 * Response:
 *  - 200 - User Details
 *  - 401 - Unauthorised to get details
 */

router.get('/logout', UserService.logout);

router.get('/profile', requiresLogin, UserService.findUser);

router.put('/update', UserService.updatePassword);

module.exports = router;
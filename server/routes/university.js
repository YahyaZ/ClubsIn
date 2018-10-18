import express from 'express';
import UniversityService from '../services/university';

const router = express.Router();

/**
 * localhost:3001/api/clubs
 * retrieves all currently existing clubs
 */
router.get('/', UniversityService.getUniversities);

module.exports = router;

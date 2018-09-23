import express from 'express';
import TaskService from '../services/tasks';

let router = express.Router();

/**
 * POST FUNCTION - adds a new task
 * 
 */
router.post('/', TaskService.addTask)

/**
 * GET - RETURNS ALL  TASKS FOR AN EVENT
 * ID IS RETRIEVED THROUGH URL PARAMS (:id)
 */
router.get('/:id', TaskService.findTasksForEvent)


module.exports = router;
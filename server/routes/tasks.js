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


/**
 * METHOD: DELETE
 *  parameters:
 *    - id: id of the task
 *  resposne:
 *    - 204: returned when task deleted
 *    - 404: returned when task could not be found
 */
router.delete('/remove/:id', TaskService.deleteTask);


module.exports = router;
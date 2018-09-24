import express from 'express';
import TaskService from '../services/tasks';

let router = express.Router();

/**
 * /api/tasks/
 * POST FUNCTION - adds a new task
 * BODY PARAMETERS:
 *  - event_id: The id of the event in which this task is related to
 *  - created_date: automatically generated date/time when task is first
 *                  created in front end
 *  - created_by: id of the user who created this task
 *  - due_date: date inputted of when this task is to be completed
 *  - name: name of task
 *  - description: small body of text describing task
 *  - completed: boolean value which signals if task is in progress or complete
 *  - assignee: the id of the user/s assigned to this task
 * Responses:
 *  - 200: Returns JSON of the newly created task data
 *  - 400: Fields are missing
 */
router.post('/', TaskService.addTask)

/**
 * /api/tasks/:id
 * GET - RETURNS ALL  TASKS FOR AN EVENT
 * PARAMETERS:
 *  - id: holds the event id for which all relevant tasks should be returned
 * OUTPUTS:
 *  - 200: returns JSON format of all found tasks
 *  - 404: No tasks with such event_id is found
 */
router.get('/:id', TaskService.findTasksForEvent)


/**
 * /api/tasks/:id
 * METHOD: DELETE
 *  parameters:
 *    - id: id of the task
 *  resposne:
 *    - 204: returned when task deleted
 *    - 404: returned when task could not be found
 */
router.delete('/tasks/:id', TaskService.deleteTask);


module.exports = router;
import express from 'express';
import TaskService from '../services/tasks';

const router = express.Router();

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
router.post('/', TaskService.addTask);

/**
 * /api/tasks/assigned
 * GET METHOD - returns a json object of all tasks user is assigned to
 * Parameters:
 *  NULL
 * Responses:
 *  - 200: JSON object of all tasks assigned to this user
 */
router.get('/assigned', TaskService.assignedTask);

/**
 * /api/tasks/:id
 * GET FUNCTION - Return single task based on id
 * Parameters:
 *  - id: id of the task which data for should be returned
 * Responses:
 *  - 404: No task of this id was found
 *  - 200: JSON format return of the task of this id
 */
router.get('/:id', TaskService.getTask);

/**
 * /api/tasks/:id
 * GET - RETURNS ALL  TASKS FOR AN EVENT
 * PARAMETERS:
 *  - id: holds the event id for which all relevant tasks should be returned
 * OUTPUTS:
 *  - 200: returns JSON format of all found tasks
 *  - 404: No tasks with such event_id is found
 */

router.get('/event/:id', TaskService.findTasksForEvent);

/**
 * /api/tasks/:id
 * METHOD: DELETE
 *  parameters:
 *    - id: id of the task
 *  resposne:
 *    - 204: returned when task deleted
 *    - 404: returned when task could not be found
 */
router.delete('/:id', TaskService.deleteTask);

/**
 * /api/tasks/
 * METHOD: PUT
 *  parameters:
 *     - _id: id of the task that is to be updated
 *     - due_date: date inputted of when this task is to be completed
 *     - name: name of task
 *     - description: small body of text describing task
 *     - completed: boolean value which signals if task is in progress or complete
 *     - assignee: the id of the user/s assigned to this task
 *  outputs:
 *     - 404: Task not found
 *     - 200: JSON format of updated task
 */
router.put('/', TaskService.updateTask);


module.exports = router;

import Tasks from '../model/tasks';
import { createError, errorMessages } from './userErrorUtils';
/**
 * Adds a new task file to the database based on provided parameters
 * POST method
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function addTask(req, res, next) {
    const {
        event_id,
        created_by,
        due_date,
        name,
        description,
        assignee,
    } = req.body;
    if (event_id && created_by && due_date && name && description && assignee) {
        const taskData = {
            event_id,
            created_by,
            due_date,
            name,
            description,
            assignee,
        };
        Tasks.create(taskData, (err) => {
            if (err) next(err);
            else { return res.json(taskData); }
        });
    } else {
        res.status(400).json({ error: errorMessages.MISSING_FIELDS });
    }
}

/**
 * Returns a single tasks data based on the id provided through
 * URL parameters
 * GET METHOD
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function getTask(req, res, next) {
    Tasks.findOne({ _id: req.params.id })
        .populate('assignee')
        .exec((err, tasks) => {
            if (err) createError(errorMessages.TASK_NOT_FOUND, 404);
            res.json(tasks);
        });
}

/**
 * Finds all tasks for a specific event and returns it
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function findTasksForEvent(req, res, next) {
    Tasks.find({ event_id: req.params.id })
        .populate('assignee')
        .exec((err, tasks) => {
            if (err) createError(errorMessages.TASK_NOT_FOUND, 404);
            res.json(tasks);
        });
}

/**
 * Finds a task and deletes it
 * TODO: get the id for this query to work
 * @param {*} req
 * @param {*} res
 */
function deleteTask(req, res, next) {
    Tasks.findOneAndDelete({ _id: req.params.id }, (err) => {
        if (err) return next(err);
        res.status(204);
    });
}

/**
 * Find task by id and update it according to provided parameters
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function updateTask(req, res, next) {
    const {
        _id,
        due_date,
        name,
        description,
        completed,
        assignee,
    } = req.body;
    if (_id && due_date && name && description && assignee) {
        Tasks.findOneAndUpdate({ _id }, {
            due_date,
            name,
            description,
            completed,
            assignee,
        }, (err, task) => {
            if (err) {
                err.status = 404;
                next(err);
            }
            res.status(200).json(task);
        });
    } else {
        res.status(400).json({ error: errorMessages.MISSING_FIELDS });
    }
}

/**
 * Returns a JSON object of assigned tasks assigned to the logged in user
 * GET METHOD
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
function assignedTask(req, res, next) {
    const { userId } = req.session;
    const limit = parseInt(req.query.limit, 10) || 5;
    Tasks.find({ assignee: userId, completed: false })
        .sort({ due_date: 1 }) // Sort by due date ascending
        .limit(limit)
        .populate('event_id', 'club_id')
        .exec((err, tasks) => {
            if (err) next(err);
            res.json(tasks);
        });
}

module.exports = {
    addTask,
    getTask,
    findTasksForEvent,
    deleteTask,
    updateTask,
    assignedTask,
};

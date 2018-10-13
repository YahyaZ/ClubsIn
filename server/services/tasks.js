import Tasks from '../model/tasks';

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
    console.log(event_id && created_by && due_date && name && description && assignee);
    if(event_id && created_by && due_date && name && description && assignee) {
        var taskData = {
            event_id: event_id,
            created_by: created_by,
            due_date: due_date,
            name: name,
            description: description,
            assignee: assignee,
        };
        Tasks.create(taskData, (err) => {
            if(err) next(err);
            else { return res.json(taskData);}
        })
    } else {
        res.status(400).json({"error":"All fields required"})
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
    Tasks.findOne({_id: req.params.id})
        .populate('assignee')
        .exec((err, tasks) => {
            if (err) {
                var error = new Error("No task found");
                error.status = 404;
                return next(error);
            }
            res.json(tasks);
        })
}

/**
 * Finds all tasks for a specific event and returns it
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next
 */
function findTasksForEvent(req, res, next){
    Tasks.find({event_id: req.params.id})
        .populate('assignee')
        .exec((err, tasks) => {
            if (err) {
                var error = new Error("No task found");
                error.status = 404;
                return next(error);
            }
            res.json(tasks);
        });
}

/**
 * Finds a task and deletes it
 * TODO: get the id for this query to work
 * @param {*} req 
 * @param {*} res 
 */
function deleteTask(req,res){
    Tasks.findOneAndDelete({_id: req.params.id}, (err) =>{
        if(err) return console.error(err);
        res.status(204);
    })
}

/**
 * Find task by id and update it according to provided parameters
 * @param {Object} req 
 * @param {Object} res
 * @param {Object} next 
 */
function updateTask(req,res, next) {
    if(req.body._id && req.body.due_date && req.body.name 
        && req.body.description && req.body.assignee) {
        Tasks.findOneAndUpdate({ _id: req.body._id },{
            due_date: req.body.due_date,
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed,
            assignee: req.body.assignee
        },(err, task) => {
            if(err) {
                console.log(err);
                err.status = 404;
                next(err);
            } 
            res.status(200).json(task);
        })
    } else {
        res.status(400).json({"error": "All fields required for updating"});
    }

}

/**
 * Returns a JSON object of assigned tasks assigned to the logged in user
 * GET METHOD
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function assignedTask(req,res,next){
    let userId = req.session.userId;
    let limit = parseInt(req.query.limit,10) || 5;
    Tasks.find({assignee : userId, completed:false})
    .sort({due_date: 1})
    .limit(limit)
    .populate('event_id', 'club_id')
    .exec(function(err, tasks){
        if(err) next(err);
        res.json(tasks);
    });
}

module.exports = {
    addTask: addTask,
    getTask: getTask,
    findTasksForEvent: findTasksForEvent,
    deleteTask: deleteTask,
    updateTask: updateTask,
    assignedTask: assignedTask,
}
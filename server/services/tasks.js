import {Tasks} from '../model/tasks';

/**
 * Adds a task
 */
function addTask(req, res, next) {
    let event_id = req.body.event_id;
    let created_date = req.body.created_date;
    let created_by = req.body.created_by;
    let due_date = req.body.due_date;
    let name = req.body.name;
    let description = req.body.description;
    let completed = req.body.completed;
    let assignee = req.body.assignee;
    if(event_id && created_by && created_date && due_date && name && description
    && completed && assignee) {
        var taskData = {
            event_id: event_id,
            created_date: created_date,
            created_by: created_by,
            due_date: due_date,
            name: name,
            description: description,
            completed: completed,
            assignee: assignee
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
 * Finds all tasks for a specific event and returns it
 * @param {} req 
 * @param {*} res 
 */
function findTasksForEvent(req, res, next){
    Tasks.find({event_id: req.params.id}, (err, tasks)=>{
        if(err){
            var error = new Error("No task found");
            error.status = 404;
            return next(error);
        }
        res.json(tasks);
    })
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
 * Find task and update it
 * TODO: update the actual task
 * @param {*} req 
 * @param {*} res 
 */
function updateTask(req,res, next) {
    Tasks.findOne({ _id: req.body.id }, (err, task) => {
        if(err) {
            err.status = 404;
            next(err);
        } 
        res.send(task);
    })
}

module.exports = {
    addTask: addTask,
    findTasksForEvent: findTasksForEvent,
    deleteTask: deleteTask
}
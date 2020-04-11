const express = require('express');
const router = express.Router();

// pull user model

const Task = require('../../models/task');

// @route  GET api/tasks/:username
// @desc   get all tasks for given username
// @access public

router.get('/:username', (req,res) => {
    Task.find({username: String(req.params.username)})
        .then(tasks => res.json(tasks))
});


// @route  POST api/tasks
// @desc   get all tasks for given username
// @access public

router.post('/', (req,res) => {
    const newTask = new Task({
        username: req.body.username,
        taskName: req.body.taskName,
        color: req.body.color
    });
    // Task.find({username: req.body.username, taskName: req.body.taskName})
    //     .then(tasks => {
    //         if (tasks.length > 0) {
    //             res.status(422).json({success: false})
    //         } else {
    //             newTask.save()
    //             .then(task => res.json(task))
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //         }
    //     }).catch(err => console.log(err))

    newTask.save()
    .then(task => res.json(task))
    .catch(err => {
        console.log(err);
    })
    
});

// @route  DELETE api/tasks/:id
// @desc   delete task given id
// @access public

router.delete('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => task.remove().then(() => res.json({ success: true })))
        .catch(err => {
            console.log(err);
            res.status(404).json({success: false});
        });
})
module.exports = router;
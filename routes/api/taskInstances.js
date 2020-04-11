const express = require('express');
const router = express.Router();

// pull user model
const User = require('../../models/user');
const TaskInstance = require('../../models/taskInstance');

// @route  GET api/taskInstances/:username
// @desc   get all task instances for given username
// @access public

router.get('/:username', (req,res) => {
    TaskInstance.find({username: String(req.params.username)})
        .then(taskInstances => res.json(taskInstances))
        .catch(err => {
            console.log(err);
        })
});


// @route  GET api/taskInstances/today/:username
// @desc   get all task instances for given username
// @access public

router.get('/today/:username', (req, res) => {
    const today = new Date()
    const dd = today.getDate()
    const mm = today.getMonth()
    const yyyy = today.getFullYear();
    TaskInstance.find({
        username: String(req.params.username),
        startDate: {"$gte": new Date(yyyy, mm, dd), "$lt": new Date(yyyy, mm, dd + 1)}
    }).then(taskInstances => res.json(taskInstances))
      .catch(err => {
          console.log(err)
      })
})


// @route  GET api/taskInstances/date
// @desc   get all task instances for given date and username
// @access public
router.get('/date/:username/:date', (req, res) => {
    // console.log('reached router')
    const date = new Date(req.params.date);
    const dd = date.getDate()
    const mm = date.getMonth()
    const yyyy = date.getFullYear();
    const toprint = new Date(yyyy, mm, dd)
    // console.log('date used by server: ' + toprint)
    TaskInstance.find({
        username: String(req.params.username),
        startDate: {"$gte": new Date(yyyy, mm, dd), "$lt": new Date(yyyy, mm, dd + 1)}
    }).then(taskInstances => res.json(taskInstances))
      .catch(err => {
          res.status(404).json({success: false})
          console.log(err)
      })
})

// @route  POST api/taskInstances
// @desc   add new task instance
// @access public

router.post('/', (req, res) => {
    User.find({username: req.body.username})
        .then((docs) => {
            console.log(docs)
            if (docs.length) {
                const newTaskInstance = new TaskInstance({
                    username: req.body.username,
                    taskName: req.body.taskName,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    duration: req.body.duration,
                    color: req.body.color
                });
                newTaskInstance.save()
                    .then(taskInstance => res.json(taskInstance));
                
            } else {
                res.json({"msg" : "no user with given username"})
            }
        })
    
    
});

// @route  DELETE api/taskInstances/:id
// @desc   DELETE task instance by id
// @access public

router.delete('/:id', (req, res) => {
    TaskInstance.findById(req.params.id)
        .then(taskInstance => taskInstance.remove().then(res.json({taskInstance})))
        .catch(err => {
            console.log(err);
            res.status(404).json({success: false});
        });
});

module.exports = router;
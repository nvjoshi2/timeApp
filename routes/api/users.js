const express = require('express');
const router = express.Router();

// pull user model

const User = require('../../models/user');
const TaskInstance = require('../../models/taskInstance');


// @route  GET api/users
// @desc   get all users
// @access public

router.get('/', (req,res) => {
    User.find()
        .then(user => res.json(user)) // make this update state
});



// @route  GET api/users/:username
// @desc   get user with specific username
// @access public

router.get('/:username', (req,res) => {
    User.findOne({username: req.params.username}, err => console.log(err))
        .then(user => res.json(user)) // make this update state
});



// @route  POST api/users/register
// @desc   add new user
// @access public

router.post('/register', (req,res) => {
    // User.find({username: req.body.username})
    //     .then(docs => {
    //         if(docs.length) { // may be uneccassary since i added unique field to name field of User model
    //             res.json({"msg": "username already taken"})
    //         } else {
    //             const newUser = new User({
    //                 username: req.body.username,
    //                 password: req.body.password,
    //                 email: req.body.email
    //             });
    //             newUser.save()
    //                 .then(user => res.json(user))

    //         }
    //     })
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    newUser.save()
        .then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.status(422).json({success: false})
        })
});

// @route  DELETE api/users/:id
// @desc   delete user by id
// @access public

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => {
            console.log(err);
            res.status(404).json({success: false});
        });
})

// @route  POST api/users/login
// @desc   login to app with username and password
// @access public

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username, password: req.body.password})
        .then(user => {
            if (!user) {
                console.log(req.body)
                res.status(404).json({success:false})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500)
        })
})

router.get('/test', (req, res) => {
    res.json({test: 'works hell yeah'})
})


module.exports = router;
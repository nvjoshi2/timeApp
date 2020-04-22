const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

// Bodyparser middleware

app.use(bodyParser.json());
app.use(cors())

// DB config
const mongoURI = require('./keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

//Use routes
const usersRouter = require('./routes/api/users')
app.use('/api/users', usersRouter)

const tasksRouter = require('./routes/api/tasks');
app.use('/api/tasks', tasksRouter);

const taskInstancesRouter = require('./routes/api/taskInstances');
app.use('/api/taskInstances', taskInstancesRouter);

//Serve static assets if in production

// if (process.env.NODE_ENV === 'production') {
    // set static folder
    // app.use(express.static('client/build'))

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    // })
// }
app.use(express.static(path.join(__dirname, "client/build")));
// const port = process.env.PORT || 5000;
const port = 3000
// console.log(port)
app.listen(port, () => console.log(`Server started on port ${port}`));
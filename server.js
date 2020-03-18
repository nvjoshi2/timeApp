const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

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


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
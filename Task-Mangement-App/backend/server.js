const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
let Task = require('./taskModel');

const app = express();
const taskRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tasks', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("connection to MongoDB database successful");
});

taskRoutes.route('/').get(function(req, res) {
    Task.find(function(err, tasks) {
        if (err) {
            console.log(err);
        } else {
            res.json(tasks);
        }
    });
});

taskRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Task.findById(id, function(err, task) {
        res.json(task);
    });
});

taskRoutes.route('/update/:id').post(function(req, res) {
    Task.findById(req.params.id, function(err, task) {
        if (!task)
            res.status(404).send("record is not found");
        else
            task.name = req.body.name;
            task.description = req.body.description;
            task.save().then(task => {
                res.json('Task updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

taskRoutes.route('/add').post(function(req, res) {
    let task = new Task(req.body);
    task.save()
        .then(task => {
            res.status(200).json({'task': 'task added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new task failed');
        });
});

taskRoutes.route('/delete/:id').post(function (req, res) {
    Task.findByIdAndRemove(req.params.id, function (err, task) {
        if(!task)
            res.status(404).send("record not found.");
        else{
            const response = {
                message : "Task deleted successfully.",
                id : task._id
            }
            res.status(200).send(response);
        }

    })
});

app.use('/tasks', taskRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
// app/routes.js

// get the task model
var Task = require('./models/tasks');

// make the routes available to our application with module.exports
module.exports = function(app) {

        // routes ===============================

        // api ---------------------------------
        // get the task list
        app.get('/api/tasks', function(req, res) {

            // mongoose has built-in functions that help us interact with MongoDB
            // use moongoose to get our tasks
            Task.find(function(err, tasks) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)

                res.json(tasks); // return all tasks in JSON format
            });
        });

        // create a task and get the task list after creation
        app.post('/api/tasks', function(req, res) {

            // create a task - again, mongoose helps us
            Task.create({
                text: req.body.text,
                done: false
            }, function(err, task) {
                if (err)
                    res.send(err);

                // you have seen this before
                Task.find(function(err, tasks) {
                    if (err)
                        res.send(err)
                    res.json(tasks);
                });
            });

        });

        // delete a task
        app.delete('/api/tasks/:task_id', function(req, res) {
        Task.remove({
            _id : req.params.task_id
        }, function(err, task) {
            if (err)
                res.send(err);

            // get the task list after deletion
            Task.find(function(err, tasks) {
                if (err)
                    res.send(err)
                res.json(tasks);
            });
        });
    });

    // application -----------------------------
    // the default route for our application that serves the index.html
    app.get('*', function(req, res) {
        res.sendFile('./public/index.html', { root: __dirname });
    });

};

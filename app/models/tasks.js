// app/models/tasks.js

    // load mongoose since we need it to define a model
    var mongoose = require('mongoose');

    module.exports = mongoose.model('Tasks', {
        text : String,
        done : Boolean
    });

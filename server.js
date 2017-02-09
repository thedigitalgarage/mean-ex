// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var fs = require('fs')
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var database = require('./config/database'); //load the database config

// configuration =================

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('combined')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',

mongoose.connect(database.url);// connect to mongoDB database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Todo = mongoose.model('Todo', {
        text : String
    });


//    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
//    mongoURLLabel = "";

//console.log(mongoURL)
//console.log(process.env.OPENSHIFT_MONGODB_DB_URL)
//console.log(process.env.MONGO_URL)
//console.log(process.env.DATABASE_SERVICE_NAME)

/*if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD']
        mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;

    }
}
*/










/*
  db.once('open', function() {
  console.log('Open Connection with MongoDB: %s', mongodburl);

  // define nosso schema
  var todoSchema = mongoose.Schema({
    name: String
  });
*/

/*  // cria metodo "falar" no model
  todoSchema.methods.talk = function () {
    return "My name is " + this.name + '\n';
  }
*/

/*  // instanciate the model =================
  var Todo = mongoose.model('Todo', todoSchema)

  Todo.create({
      text: 'create hello world',
      done: false
  }, function(err, todo) {
      if (err)
          res.send(err);

      // get and return all the todos after you create another
      Todo.find(function(err, todos) {
          if (err)
              res.send(err)
          res.json(todos);
      });
  });
});
*/



//console.log('Connected to MongoDB at: %s', mongoURL);

// define model =================
//var Todo = mongoose.model('Todo', {
//    text: String
//});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {
    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
       if (err)
            res.send(err)

       res.json(todos); // return all todos in JSON format
   });
});

// create todo and send back all todos after creation
 app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    if (db) {
        var col = db.collection('counts');
        // Create a document with request IP and current time of request
        col.insert({
            ip: req.ip,
            date: Date.now()
        });
        col.count(function(err, count) {
            res.render('index.html', {
                pageCountMessage: count,
                dbInfo: dbDetails
            });
        });
    } else {
        //res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)

        res.render('./public/index.html', {
            pageCountMessage: null
        });
    }
});


// listen (start app with node server.js) ======================================
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;

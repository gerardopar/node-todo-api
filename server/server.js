// - - [ imported modules ] - - 
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// - - [ local modules ] - - 
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

// - - [ app code ] - - 
let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); //converts json data into an object

//post todo route
app.post('/todos', (req, res) => {
    let todo = new Todo({   //setting up the todo object
        text: req.body.text
    });

    todo.save().then((doc) => { //saves the users todo
        res.send(doc); 
    }, (e) => {
        res.status(400).send(e); //throws an error (404)
    });
});

//get todo route
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => { //fetches todos
        res.send({todos}); 
    }, (e) => {
        res.status(400).send(e); //throws an error (404)
    });
});

//get todo by id route
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

//delete todo by id route
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});

//update todo by id route
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
        //the pick method allows properties to be selected from an object 
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //checking if a todo is completed
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    //updating the todo
        //setting a new body with the mongoDB update operators
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {
            if(!todo) {
                return res.status(404).send();
            }
            
            res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        })
});

// setting up our server on port 3000
app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});


module.exports = {
    app
};
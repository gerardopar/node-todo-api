// - - [ imported modules ] - - 
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// - - [ local modules ] - - 
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

// - - [ app code ] - - 
let app = express();

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

// setting up our server on port 3000
app.listen(3000, () => {
    console.log('Server up on port 3000');
});


module.exports = {
    app
};
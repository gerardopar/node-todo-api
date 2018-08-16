// - - [ imported modules ] - - 
const express = require('express');
const bodyParser = require('body-parser');

// - - [ local modules ] - - 
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');  

// - - [ app code ] - - 
let app = express();

app.use(bodyParser.json()); //converts json data into an object

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

// setting up our server on port 3000
app.listen(3000, () => {
    console.log('Server up on port 3000');
});
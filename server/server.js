require('../config/config'); //importing our environment configuration

// - - [ imported modules ] - - 
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// - - [ local modules ] - - 
let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
let { authenticate } = require ('./middleware/authenticate');

// - - [ TODO ROUTES ] - - 
let app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); //converts json data into an object

//post todo route
app.post('/todos', authenticate, (req, res) => {
    let todo = new Todo({   //setting up the todo object
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => { //saves the users todo
        res.send(doc); 
    }, (e) => {
        res.status(400).send(e); //throws an error (404)
    });
});

//get todo route
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => { //fetches todos
        res.send({todos}); 
    }, (e) => {
        res.status(400).send(e); //throws an error (404)
    });
});

//get todo by id route
app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
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
app.patch('/todos/:id', authenticate, (req, res) => {
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
    Todo.findByOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true})
        .then((todo) => {
            if(!todo) {
                return res.status(404).send();
            }
            
            res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        })
});

// - - [ USER ROUTES ] - - 
//sign up route
app.post('/users', (req, res) => {
        let body = _.pick(req.body, ['email', 'password']); //selects the object properties we will check on sign up/in
        let user = new User(body);

        user.save().then(() => {
            return user.generateAuthToken(); //generating authentication token
        }).then((token) => { //token returned from generateAuthToken
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            res.status(400).send(e);
        });
});

//getting a user based on a token ***** authentication
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//sign up route
app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']); //selects the object properties we will check on sign up/in
    
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

//sign out route
app.delete('/users/me/token', authenticate, (req,res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

// setting up our server on port 3000
app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});


module.exports = {
    app
};
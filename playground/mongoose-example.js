let mongoose = require('mongoose'); //importing mongoose module

mongoose.Promise = global.Promise; //setting up mongoose to be used with promises
mongoose.connect('mongodb://localhost:27017/TodoApp'); //setting up the mongoDB

//setting up the mongoose model/schema
let Todo = mongoose.model('Todo', {
    //setting up properties with validators
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

//setting up a new todo, to be inserted into the db
// let newTodo = new Todo({
//     text: 'take nap',
//     completed: false,
//     completedAt: 1534311000
// });

//saving the new todo in the db
// newTodo.save().then((doc) => {
//     console.log('Save todo', doc)
// }, (e) => {
//     console.log('unable to save todo');
// });

//setting up a new todo, to be inserted into the db
let otherTodo = new Todo({
    text: 'testing todo'
});

//saving the new todo in the db
// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('unable to save todo');
// });

//setting up the mongoose model/schema
let User = mongoose.model('User', {
    //setting up properties with validators
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    }
});

let newUser = new User({
    email: 'testemail@gmail.com'
});

newUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
    console.log('unable to save user');
});
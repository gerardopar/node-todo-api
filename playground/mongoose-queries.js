const { ObjectID } = require('mongodb')
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo'); 
const { User } = require('./../server/models/user');

let id = "5b75e309f4574e1ac5c31bf81"; //todo id

//(new object)id method not required,
//mongoose automatically creates an object
            //finds multiple todos
// Todo.find({ //queries the whole database for a todo with the id passed as an argument
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// });
//                 //finds a single todo
// Todo.findOne({ //queries the whole database for a todo with the id passed as an argument
//     _id: id
// }).then((todo) => {
//     console.log('Single Todo', todo)
// });

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todo);
// }).catch((e) => {
//     return console.log(e);
// });

let userId = "5b75eb4ecac54499144fb4361"; //userID

User.findById(userId).then((user) => { //fetching a user based on the userID
    if(!user){
        console.log('UserID not found');
    }
    console.log('User by ID', user);
}).catch((e) => {
    return console.log(e);
});
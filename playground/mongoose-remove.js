// modules imported
const { ObjectID } = require('mongodb');
// local modules imported
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

//removes all documents from the collection
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//removes one document from the collection
// Todo.findOneAndRemove({ _id: '5b778619cac54499144fc3c8'}).then((todo) => {
//     console.log(todo);
// });

//removes one document from the collection based on an ObjectID
Todo.findByIdAndRemove('5b778619cac54499144fc3c8').then((todo) => {
    console.log(todo);
});



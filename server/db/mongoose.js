let mongoose = require('mongoose'); //importing mongoose module

mongoose.Promise = global.Promise; //setting up mongoose to be used with promises
mongoose.connect('mongodb://localhost:27017/TodoApp'); //setting up the mongoDB

module.exports = {
    mongoose
};
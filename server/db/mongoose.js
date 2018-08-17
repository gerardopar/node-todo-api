let mongoose = require('mongoose'); //importing mongoose module

mongoose.Promise = global.Promise; //setting up mongoose to be used with promises
// mongoose.connect('mongodb://localhost:27017/TodoApp'); //setting up the mongoDB

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://admin:Kief323812!@ds123562.mlab.com:23562/todoapp'
  };
  mongoose.connect( process.env.PORT ? db.localhost : db.mlab);

module.exports = {
    mongoose
};
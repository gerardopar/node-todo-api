let mongoose = require('mongoose'); //importing mongoose module

mongoose.Promise = global.Promise; //setting up mongoose to be used with promises
mongoose.connect(process.env.MONGODB_URI); //setting up the mongoDB connection

module.exports = {
    mongoose
};
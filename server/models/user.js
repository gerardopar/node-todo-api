let mongoose = require('mongoose'); //importing mongoose module

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

module.exports = {
    User
}
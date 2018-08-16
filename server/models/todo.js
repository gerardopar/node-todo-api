let mongoose = require('mongoose'); //importing mongoose module

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

module.exports = {
    Todo
}
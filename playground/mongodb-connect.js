//importing the mongoDB client
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://localhost:27017/TodoApp'; //database url

//connecting to the mongoDBv3.1
MongoClient.connect(url, (err, client) => {
    if(err) {
        return console.log('unable to connect to mongodb server')
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp'); //declaring our database to connect to

    // //inserting a todo/data into the Todos collection
    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('unable to insert todo');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // //inserting a user/data into the Users collection
    // db.collection('Users').insertOne({
    //     name: 'Amroe',
    //     age: 25,
    //     location: 'Los Angeles'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('unable to insert user');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.close();
});
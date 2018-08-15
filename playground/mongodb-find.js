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

    //fetches all documents from the Todos collection
    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    //fetches documents from the Todos collection based on a query ex: completed: true
    //  db.collection('Todos').find({completed: true}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    //fetches documents from the Todos collection based on a unique ObjectID query ex: _id: new ObjectID('UniqueID')
    // db.collection('Todos').find({_id: new ObjectID('5b74979ba94d586a3f951435')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    //fetches the count of the documents available inside the Todos collection 
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    //fetches the count of the documents available inside the Users collection with a name of Gerardo
    db.collection('Users').find({name: 'Gerardo'}).count().then((count) => {
        console.log(`Users count: ${count}`);
    }, (err) => {
        console.log('unable to fetch todos', err);
    });

    //fetches the documents available inside the Users collection with a name of Gerardo
    db.collection('Users').find({name: 'Gerardo'}).toArray().then((docs) => {
        console.log('User');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch todos', err);
    });

    // client.close();
});
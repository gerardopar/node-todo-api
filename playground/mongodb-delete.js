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

    //deletes multiple documents with the text: walk the dog
    // db.collection('Todos').deleteMany({text: 'walk the dog'}).then((result) => {
    //     console.log(result)
    // });

    //deletes a single document with the text: walk the dog
    // db.collection('Todos').deleteOne({text: 'walk the dog'}).then((result) => {
    //     console.log(result)
    // });

    //deletes a single document with the text: walk the dog and shows the user the document being deleted
    // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
    //     console.log(result)
    // });

    // db.collection('Users').deleteMany({name: 'john'}).then((result) => {
    //     console.log(result)
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b7487f92e979e03cde6287a')}).then((result) => {
        console.log(result)
    });

    //_id: new ObjectID(5b7487f92e979e03cde6287a)

    // client.close();
});

 //mongoDB remove methods
    //deleteMany
    //deleteOne
    //findOneAndDelete
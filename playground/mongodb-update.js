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

    //updates a single document from the todos collection
    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID("5b7492a4a94d586a3f95135d")}, 
    // {
    //     //update operators required
    //     $set: {
    //         completed: false
    //     }
    // },
    //     {
    //         returnOriginal : false
    //     }).then((result) => {
    //         console.log(result);
    // });

    // db.collection('Users').findOneAndUpdate({_id: new ObjectID("5b7486682fcf1803c6b1da23")}, 
    // {
    //     //update operators required
    //     $set: {
    //         name: 'GerardoLoks'
    //     }
    // },
    //     {
    //         returnOriginal : false
    //     }).then((result) => {
    //         console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({_id: new ObjectID("5b7486682fcf1803c6b1da23")}, 
    {
        //update operators required
        $inc: {
            age: -3
        }
    },
        {
            returnOriginal : false
        }).then((result) => {
            console.log(result);
    });

    // client.close();
});

 //mongoDB update methods
    //findOneAndUpdate
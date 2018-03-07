const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    db.collection('Users').insertOne({
        name: 'Rodrigo Zanetta',
        age: 28
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert User.');
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});
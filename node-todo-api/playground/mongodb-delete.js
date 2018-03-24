const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // db.collection('Todos').deleteMany({name: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({name: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Todos').findOneAndDelete({name: 'Eat lunch'}).then((result) => {
        console.log(result);
    });

    // db.close();
})
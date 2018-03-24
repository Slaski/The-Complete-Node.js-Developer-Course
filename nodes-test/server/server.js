const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/users', (req, res) => {
    res.send([
        {
            name: 'Roderick',
            age: 28
        },
        {
            name: 'Angeline',
            age: 30
        },
        {
            name: 'Honey',
            age: 13
        }
    ]);
});

app.listen(3000);

module.exports.app = app;
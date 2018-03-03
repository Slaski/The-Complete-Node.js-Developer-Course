const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found'
    })
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
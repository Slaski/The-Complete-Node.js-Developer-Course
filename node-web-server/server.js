const express = require('express');

var app = express();

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    response.send({
        name: 'Slaski',
        age: 28
    });
});

app.get('/about', (request, response) => {
    response.send('About Page');
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.listen(3000);
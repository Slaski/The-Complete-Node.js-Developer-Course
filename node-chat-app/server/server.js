require('./config');

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, './../public');
const port = process.env.PORT;

var app = express();
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started listening on port ${port}.`);
})

module.exports = {app};
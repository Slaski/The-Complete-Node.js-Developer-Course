console.log('Starting app.');

const fs = require('fs');
const os = require('os');
const notes = require('./notes');

console.log(notes.add(1, 2));

var user = os.userInfo();

fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age} years old.`, err => {
    if (err) {
        console.log('Unable to write to file.');
    }
});
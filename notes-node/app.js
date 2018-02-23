console.log('Starting app.');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes');

console.log(_.isString(2));
console.log(_.isString('test'));
console.log(_.uniq([1, 2, 3, 3, 2, 1]));

console.log(notes.add(1, 2));

var user = os.userInfo();

fs.appendFile('greetings.txt', `Hello ${user.username}!`, err => {
    if (err) {
        console.log('Unable to write to file.');
    }
});
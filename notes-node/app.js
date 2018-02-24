console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes');

console.log(process.argv);

let command = process.argv[2];
console.log(`Command: ${command}`);

switch(command) {
    case 'add':
        console.log('Adding new note.');
        break;
    case 'list':
        console.log('Listing all notes.');
        break;
    case 'read':
        console.log('Reading a note.');
        break;
    case 'remove':
        console.log('Removing note.');
        break;
    default:
        console.log('Command not recognized.');
        break;
}
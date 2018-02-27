console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');


const argv = yargs.argv;
let command = process.argv[2];
console.log(`Command: ${command}`);

let logNote = (note) => {
    debugger;
    console.log('--');
    console.log('Title:', note.title);
    console.log('Body:', note.body);
}

switch(command) {
    case 'add':
        var note = notes.addNote(argv.title, argv.body);
        if (note) {
            console.log('Note created.');
            logNote(note);
        } else {
            console.log('Note title already exists.');
        }
        break;
    case 'list':
        notes.getAll();
        break;
    case 'read':
        var note = notes.getNote(argv.title);
        if (note) {
            console.log('Note read.');
            logNote(note);
        } else {
            console.log('Note not found.');
        }
        break;
    case 'remove':
        let noteRemoved = notes.removeNote(argv.title);
        let message = noteRemoved ? "Note was successfully removed." : "Note not found.";
        console.log(message);
        break;
    default:
        console.log('Command not recognized.');
        break;
}
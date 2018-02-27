const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all available notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
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
        let allNotes = notes.getAll();
        console.log(`Printing ${allNotes.length} note(s).`);
        allNotes.forEach(note => logNote(note));
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
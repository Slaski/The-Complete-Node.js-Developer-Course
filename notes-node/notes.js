console.log('Stating notes.js.');

const fs = require('fs');

const notesFileName = 'notes-data.json';

let fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync(notesFileName));
    } catch(e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync(notesFileName, JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {title, body};

    let duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getAll = () => {
    console.log('Getting all notes.');
};

let getNote = (title) => {
    console.log('Reading note', title);
};

let removeNote = (title) => {
    console.log('Removing note', title);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};
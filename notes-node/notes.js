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
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title === title);
    if (filteredNotes.length > 0) {
        return filteredNotes[0];
    } else {
        return null;
    }
};

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};
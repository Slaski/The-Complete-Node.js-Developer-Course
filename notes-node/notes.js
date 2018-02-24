console.log('Stating notes.js.');

const fs = require('fs');

let addNote = (title, body) => {
    try {
        let notes = JSON.parse(fs.readFileSync('notes-data.json'));
    } catch(e) {
        notes=[];
    }

    let note = {title, body};

    let duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
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
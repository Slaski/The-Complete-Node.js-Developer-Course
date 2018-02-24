console.log('Stating notes.js.');

let addNote = (title, body) => {
    console.log('Adding note:', title, body);
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
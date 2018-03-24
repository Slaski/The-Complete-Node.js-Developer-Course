const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

// var id = '5aa0321eb16cf70374302ad1';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({_id: id}).then((todos) => {
//     console.log('Todos:', todos);
// });

// Todo.findOne({_id: id}).then((todo) => {
//     console.log('Todo:', todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo:', todo);
}).catch((err) => console.log(err));
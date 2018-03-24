const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove(new ObjectID('5aa13818e114aa1f40e00318').then((result) => {
//     console.log(result);
// }));

Todo.findByIdAndRemove('5aa13818e114aa1f40e00318').then((result) => {
    console.log(result);
});
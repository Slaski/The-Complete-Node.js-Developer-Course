const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo, User} = require('./../../models');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'slaski@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'rodrigo@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => done())
        .catch(err => {
            console.log('Error populating the Todos test database.');
            console.log(err);
        });
};

const populateUsers = (done) => {
    User.remove({})
        .then(() => {
            var userOne = new User(users[0]).save();
            var userTwo = new User(users[1]).save();
            return Promise.all([userOne, userTwo]);
        })
        .then(() => done())
        .catch(err => console.log(err));
};

module.exports = {todos, populateTodos, users, populateUsers};
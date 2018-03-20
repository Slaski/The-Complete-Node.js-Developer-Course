require('./config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send({});
        }
        return res.send({todo});
    }).catch((err) => {
        return res.status(400).send(err);
    });
});

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    })
        .then(todo => {
            if (!todo) {
                return res.status(404).send({});
            }

            res.send({todo});
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['completed', 'text']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true})
        .then(todo => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        })
        .catch(err => {
            res.status(400).send();
        });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save()
        .then(() => {
            return user.generateAuthToken();
        })
        .then(token => {
            res.header('x-auth', token).send(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password)
        .then(user => {
            user.generateAuthToken().then(token => {
                res.header('x-auth', token).send(user);
            });
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => {
            res.send();
        })
        .catch(err => {
            res.status(400).send();
        });
});

app.listen(port, () => {
    console.log(`Started on port ${port}.`);
});

module.exports = {app};
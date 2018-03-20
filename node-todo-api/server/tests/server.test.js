const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo, User} = require('../models');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('server.js', () => {
    describe('GET /todos', () => {
        it('should get all todos', (done) => {
            request(app)
                .get('/todos')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(1);
                })
                .end(done);
        });
    });
    
    describe('GET /todos/:id', () => {
        it('should return todo doc', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(todos[0].text);
                })
                .end(done);
        });
    
        it('should return 404 if todo not found', (done) => {
            request(app)
                .get(`/todos/${new ObjectID().toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);
        });
    
        it('should return 404 for non-object ids', (done) => {
            request(app)
                .get(`/todos/1234`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);
        });

        it('should return 404 for todos from another user', (done) => {
            request(app)
                .get(`/todos/${todos[1]._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);
        });

        it('should return 401 for unauthenticated user', (done) => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(401)
                .end(done);
        });
    });
    
    describe('POST /todos', () => {
        it('should create a new todo', (done) => {
            var text = 'Test todo text';
    
            request(app)
                .post('/todos')
                .set('x-auth', users[0].tokens[0].token)
                .send({text})
                .expect(200)
                .expect((res) => {
                    expect(res.body.text).toBe(text);
                    expect(res.body._creator).toBe(users[0]._id.toHexString());
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
    
                    Todo.find({text}).then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        expect(todos[0]._creator.toHexString()).toBe(users[0]._id.toHexString());
                        done();
                    }).catch((err) => done(err));
                });
        });
    
        it('should not create todo with invalid body data', (done) => {
            request(app)
                .post('/todos')
                .set('x-auth', users[0].tokens[0].token)
                .send({})
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
    
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    }).catch((err) => done(err));
                });
        });
    });
    
    describe('DELETE /todos/:id', () => {
        it('should remove a todo', (done) => {
            var hexId = todos[0]._id.toHexString();
            request(app)
                .delete(`/todos/${hexId}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo._id).toBe(hexId);
                    expect(res.body.todo.text).toBe(todos[0].text);
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
    
                    Todo.findById(hexId).then((todo) => {
                        expect(todo).toNotExist();
                        done();
                    }).catch((err) => done(err));
                });
        });
    
        it('should return 404 if todo not found', (done) => {
            request(app)
                .delete(`/todos/${new ObjectID().toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);
        });
    
        it('should return 404 for non-object id', (done) => {
            request(app)
                .delete('/todos/123abc')
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);
        });

        it('should return 401 for non-authenticated user', (done) => {
            request(app)
                .delete(`/todos/${todos[0]._id.toHexString()}`)
                .expect(401)
                .end(done);
        });

        it('should return 404 for a todo from another user', (done) => {
            request(app)
                .delete(`/todos/${todos[1]._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .expect(404)
                .end(done);
        });
    });
    
    describe('PATCH /todos/:id', () => {
        it('should update the todo', (done) => {
            var todo = todos[0];
            request(app)
                .patch(`/todos/${todo._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .send({
                    completed: true,
                    text: 'First Todo Completed'
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo._id).toBe(todo._id.toHexString());
                    expect(res.body.todo.text).toBe('First Todo Completed');
                    expect(res.body.todo.completed).toBe(true);
                    expect(res.body.todo.completedAt).toBeA('number');
                })
                .end(done);
        });
    
        it('should clear completedAt when todo is not completed', (done) =>{ 
            var todo = todos[0];
            request(app)
                .patch(`/todos/${todo._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .send({
                    completed: false,
                    text: 'Second Todo Not Completed'
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo._id).toBe(todo._id.toHexString());
                    expect(res.body.todo.text).toBe('Second Todo Not Completed');
                    expect(res.body.todo.completed).toBe(false);
                    expect(res.body.todo.completedAt).toNotExist();
                })
                .end(done);
        });

        it('should return 401 for non-authenticated user', (done) => {
            request(app)
                .patch(`/todos/${todos[0]._id.toHexString()}`)
                .send({
                    text: 'Update from a non-authenticated user'
                })
                .expect(401)
                .end(done);
        });

        it('should return 404 for a todo from another user', (done) => {
            request(app)
                .patch(`/todos/${todos[1]._id.toHexString()}`)
                .set('x-auth', users[0].tokens[0].token)
                .send({
                    text: 'Another users update'
                })
                .expect(404)
                .end(done);
        });
    });

    describe('GET /users/me', () => {
        it('should return a user if authenticated', (done) => {
            request(app)
                .get('/users/me')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(users[0]._id.toHexString());
                    expect(res.body.email).toBe(users[0].email);
                })
                .end(done);
        });

        it('should return a 401 if not authenticated', (done) => {
            request(app)
                .get('/users/me')
                .expect(401)
                .expect((res) => {
                    expect(res.body).toEqual({});
                })
                .end(done);
        });
    });

    describe('POST /users', () => {
        it('should create a user', (done) => {
            var email = 'example@example.com';
            var password = '123mnb!';

            request(app)
                .post('/users')
                .send({email, password})
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toExist();
                    expect(res.body.email).toBe(email);
                    expect(res.body._id).toExist();
                })
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    User.findOne({email})
                        .then((user) => {
                            expect(user).toExist();
                            expect(user.password).toNotBe(password);
                            done();
                        })
                        .catch((err) => done(err));
                });
        });

        it('should return validation errors if request is invalid', (done) => {
            var email = 'notavalidemail@@.com';
            var password = '123';

            request(app)
                .post('/users')
                .send({email, password})
                .expect(400)
                .end(done);
        });

        it('should not create user if email in use', (done) => {
            var email = users[0].email;
            var password = '555dfg%';

            request(app)
                .post('/users')
                .send({email, password})
                .expect(400)
                .end(done);
        });
    });

    describe('POST /users/login', () => {
        it('should login user and return auth token', (done) => {
            var {email, password} = users[1];

            request(app)
                .post('/users/login')
                .send({email, password})
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toExist();
                })
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    User.findById(users[1]._id)
                        .then((user) => {
                            expect(user.tokens[1]).toInclude({
                                access: 'auth',
                                token: res.headers['x-auth']
                            });
                            done();
                        })
                        .catch((err) => {
                            done(err);
                        });
                });
        });

        it('should reject invalid login', (done) => {
            var email = users[1].email;
            var password = users[1].password + '1';

            request(app)
                .post('/users/login')
                .send({email, password})
                .expect(400)
                .expect((res) => {
                    expect(res.headers['x-auth']).toNotExist();
                })
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    User.findById(users[1]._id)
                        .then((user) => {
                            expect(user.tokens.length).toBe(1);
                            done();
                        })
                        .catch((err) => {
                            done(err);
                        });
                });
        });
    });

    describe('DELETE /users/me/token', () => {
        it('should remove auth token on logout', (done) => {
            var token = users[0].tokens[0].token;
            request(app)
                .delete('/users/me/token')
                .set('x-auth', token)
                .send()
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toNotExist();
                })
                .end((err) => {
                    if (err) {
                        return done(err);
                    }

                    User.findById(users[0]._id)
                        .then((user) => {
                            expect(user.tokens.length).toBe(0);
                            done();
                        })
                        .catch((err) => {
                            done(err);
                        });
                });
        });

        it('should return 401 if not authenticated', (done) => {
            request(app)
                .delete('/users/me/token')
                .send()
                .expect(401)
                .end(done);
        });
    });
});
const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');
const { User } = require('../models/user');


//assures db is empty before testing
beforeEach(populateUsers);
beforeEach(populateTodos);

// - - [Test cases for POST ] - - 
describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err) {
                return done(err)
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => {
                done(e);
            })
        });
    });    

    it('should not create a todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err)
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(() => done(e));
            });
        });

});

// - - [Test cases for GET ] - - 
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

// - - [Test cases for GET /todos/id ] - - 
describe('GET /todos/id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {

        let id = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if todo is non-object id', (done) => {
        
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });

});

// - - [Test cases for DELETE /todos/id ] - - 
describe('DELETE /todos/:id', () => {

    it('should remove a todo', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => done(e))

        })
    });


    it('should return 404 if todo not found', (done) => {

        let id = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {

        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });

});

// - - [Test cases for PATCH /todos/id ] - -
describe('PATCH /todos/:id', () => {

    it('should update the todo', (done) => {
        let id = todos[0]._id.toHexString();
        let text = 'This should be the new text';

        request(app)
            .patch(`/todos/${id}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done)

    });


    it('should clear completedAt when todo is not completed', (done) => {

        let id = todos[1]._id.toHexString();
        let text = 'This should be the new text';

        request(app)
            .patch(`/todos/${id}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done)

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
        let email = 'example@example.com';
        let password = '123abc';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if(err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                });
            });
    });

    it('should return validation errors if request invalid', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'and',
                password: '123'
            })
            .expect(400)
            .end(done);
    });

    it('should not create a user if email exists', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password: 'userOnePass'
            })
            .expect(400)
            .end(done);
    });
})

describe('POST /users/login', () => {

    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                done();
            }).catch((e) => done(e));
        });
    });

    it('should reject invalid login', () => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password + '1'
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toNotExist();
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });

});

describe('DELETE /users/me/token', () => {

    it('should remove auth token on logout', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });

});
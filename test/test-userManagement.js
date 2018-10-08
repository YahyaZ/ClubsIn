import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import User from '../server/model/users';
import request from 'supertest';

let should = chai.should();

chai.use(chaiHttp);

describe('User Management', function () {
    beforeEach((done) => {
        User.remove({}, (err) => {
            User.insertMany([
                { "clubs": [], "email": "john.smith@gmail.com", "firstName": "John", "lastName": "Smith", "password": "$2b$10$pVVILKdJ/kyyF1RUlTyEouO.7xHyDMbBbKpcpyOjtqgZn.x.rGBKu" },
            ], function (err) {
                done();
            }
            );

        });
    });

    describe('User Login', function () {
        it('should login user when details are correct', function (done) {
            let user = {
                email: "john.smith@gmail.com",
                password: "Test1234",
            }
            chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.a.property('email').eql(user.email);
                    res.body.should.have.a.property('firstName');
                    res.body.should.have.a.property('lastName');
                    res.body.should.have.a.property('_id');
                    res.body.should.have.a.property('clubs');
                    res.body.should.not.have.a.property('password');
                    done();
                });

        });
        it('should not login user when details are incorrect', function (done) {
            let user = {
                email: "john.smith@gmail.com",
                password: "Test1235",
            }
            chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('username');
                    res.body.should.have.a.property('error').eql('Wrong email or password');
                    done();
                });

        });
        it('should not login user when username is missing', function (done) {
            let user = {
                password: "Test1235",
            }
            chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('_id');
                    res.body.should.have.a.property('error').eql('Please fill out all fields');
                    done();
                });

        });
        it('should not login user when password is missing', function (done) {
            let user = {
                email: "john.smith@gmail.com",
            }
            chai.request(server)
                .post('/api/user/login')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('_id');
                    res.body.should.have.a.property('error').eql('Please fill out all fields');
                    done();
                });

        });
    });

    describe('User Signup', function () {
        it('should sign up the user when details are valid', function (done) {
            let user = {
                email: "sign@up.com",
                firstName: "Sign",
                lastName: "Up",
                password: "TestPassword",
                passwordConf: "TestPassword"
            }
            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.a.property('email').eql(user.email);
                    res.body.should.have.a.property('firstName');
                    res.body.should.have.a.property('lastName');
                    res.body.should.have.a.property('_id');
                    res.body.should.have.a.property('clubs');
                    res.body.clubs.length.should.be.eql(0);
                    res.body.should.not.have.a.property('password');
                    done();
                });

        });
        it('should not sign up the user if the email already exists', function (done) {
            let user = {
                email: "john.smith@gmail.com",
                firstName: "John",
                lastName: "Smith",
                password: "Test1234",
                passwordConf: "Test1234",
            }
            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('_id');
                    res.body.should.have.a.property('error').eql('User Already Exists');
                    done();
                });

        });
        it('should not sign up user when email is missing', function (done) {
            let user = {
                firstName: "John",
                lastName: "Smith",
                password: "Test1234",
                passwordConf: "Test1234",
            }
            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('_id');
                    res.body.should.have.a.property('error').eql('Please fill out all fields');
                    done();
                });

        });
        it('should not sign up user when first name is missing', function (done) {
            let user = {
                email: "jane.smith@gmail.com",
                lastName: "Smith",
                password: "Test1234",
                passwordConf: "Test1234",
            }
            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('_id');
                    res.body.should.have.a.property('error').eql('Please fill out all fields');
                    done();
                });

        });
        it('should not sign up user when last name is missing', function (done) {
            let user = {
                email: "jane.smith@gmail.com",
                firstName: "Jane",
                password: "Test1234",
                passwordConf: "Test1234",
            }
            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('_id');
                    res.body.should.have.a.property('error').eql('Please fill out all fields');
                    done();
                });

        });
        it('should not sign up the user when password is not the same as the confirmation password', function (done) {
            let user = {
                email: "jane.smith@gmail.com",
                firstName: "Jane",
                lastName: "Smith",
                password: "Test1234",
                passwordConf: "Test1235",
            }
            chai.request(server)
                .post('/api/user/signup')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('_id');
                    res.body.should.have.a.property('error').eql('Passwords do not match');
                    done();
                });
        });
    });


    describe('User Logout', function () {
        it('should succesfully log out the user', function (done) {
            chai.request(server)
                .get('/api/user/logout')
                .end(function (err, res) {
                    res.should.have.status(204);
                    res.body.should.be.empty;
                    done();
                });

        });
    });

    describe('User Change Password', function () {
        let user = {
            email: "john.smith@gmail.com",
            password: "Test1234",
        }

        let authenticatedUser = request.agent(server);

        before((done) => {
            authenticatedUser
                .post('/api/user/login')
                .send(user)
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                }
                );

        });

        it('should succesfully change a users password and log in with new password', function (done) {
            let change = {
                email: "john.smith@gmail.com",
                password: "Test1234",
                newPassword: "Test4321"
            }

            let user = {
                email: "john.smith@gmail.com",
                password: "Test4321",
            }
            authenticatedUser
                .put('/api/user/update')
                .send(change)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.a.property('email').eql(user.email);
                    res.body.should.have.a.property('firstName');
                    res.body.should.have.a.property('lastName');
                    res.body.should.have.a.property('_id');
                    res.body.should.have.a.property('clubs');
                    res.body.should.not.have.a.property('password');

                    chai.request(server)
                        .post('/api/user/login')
                        .send(user)
                        .end(function (err, res) {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
        it('should succesfully change a users password and not log in with old password', function (done) {
            let change = {
                email: "john.smith@gmail.com",
                password: "Test1234",
                newPassword: "Test4321"
            }

            let user = {
                email: "john.smith@gmail.com",
                password: "Test1234",
            }
            authenticatedUser
                .put('/api/user/update')
                .send(change)
                .end(function (err, res) {
                    res.should.have.status(200);
                    chai.request(server)
                        .post('/api/user/login')
                        .send(user)
                        .end(function (err, res) {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.not.have.a.property('username');
                            res.body.should.have.a.property('error').eql('Wrong email or password');
                            done();
                        });
                });
        });
        it('should not change a users password when old password is incorrect and not log in with new password', function (done) {
            let change = {
                email: "john.smith@gmail.com",
                password: "Test124",
                newPassword: "Test4321"
            }

            let user = {
                email: "john.smith@gmail.com",
                password: "Test4321",
            }
            authenticatedUser
                .put('/api/user/update')
                .send(change)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('username');
                    res.body.should.have.a.property('error').eql('Wrong email or password');
                    chai.request(server)
                        .post('/api/user/login')
                        .send(user)
                        .end(function (err, res) {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.not.have.a.property('username');
                            res.body.should.have.a.property('error').eql('Wrong email or password');
                            done();
                        });
                });
        });
        it('should not change a users password when new Password is missing and not log in with new password', function (done) {
            let change = {
                email: "john.smith@gmail.com",
                password: "Test1234",
            }

            let user = {
                email: "john.smith@gmail.com",
                password: "Test4321",
            }
            authenticatedUser
                .put('/api/user/update')
                .send(change)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.not.have.a.property('username');
                    res.body.should.have.a.property('error').eql('Please fill out all fields');
                    chai.request(server)
                        .post('/api/user/login')
                        .send(user)
                        .end(function (err, res) {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.not.have.a.property('username');
                            res.body.should.have.a.property('error').eql('Wrong email or password');
                            done();
                        });
                });
        });
    });
});

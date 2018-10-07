import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import Clubs from '../server/model/clubs';
import Users from '../server/model/users';
import request from 'supertest';

let should = chai.should();

chai.use(chaiHttp);


describe('Clubs', function () {
    let user = {
        email: "john.smith@gmail.com",
        password: "Test1234",
    }

    let authenticatedUser = request.agent(server);

    beforeEach((done) => {
        Users.remove({}, (err) => {
            // Login User
            Users.insertMany([
                { "clubs": [], "email": "john.smith@gmail.com", "firstName": "John", "lastName": "Smith", "password": "$2b$10$pVVILKdJ/kyyF1RUlTyEouO.7xHyDMbBbKpcpyOjtqgZn.x.rGBKu" },
                { "clubs": [], "email": "jane.smith@gmail.com", "firstName": "John", "lastName": "Smith", "password": "$2b$10$pVVILKdJ/kyyF1RUlTyEouO.7xHyDMbBbKpcpyOjtqgZn.x.rGBKu" }
            ], function (err) {
                authenticatedUser
                    .post('/api/user/login')
                    .send(user)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        user._id = res.body._id;
                        done();
                    }
                    );

            });
        });
    });


    describe('Club Sign Up', function () {
        beforeEach(done => {
            Clubs.remove({}, err => {
                done();
            })
        });

        it('should add a club to the user when details are valid and user is logged in', function (done) {
            let club = {
                "type": "Culture",
                "name": "Culture Club",
                "university": "5ba7090d8046d72680a34505",
            }
            authenticatedUser
                .post('/api/club/create')
                .send(club)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('users');
                    res.body.users.length.should.be.eql(1);
                    res.body.users[0].should.be.eql(user._id);
                    res.body.should.have.property('type');
                    res.body.should.have.property('name');
                    res.body.should.have.property('university');
                    res.body.should.have.property('link');
                    club._id = res.body._id;
                    authenticatedUser
                        .get('/api/user/profile')
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.clubs.length.should.be.eql(1);
                            res.body.clubs[0].should.be.eql(club._id);
                            done();
                        })

                });

        });
        it('should not add a club to the user when type is missing and user is logged in', function (done) {
            let club = {
                "name": "Culture Club",
                "university": "5ba7090d8046d72680a34505",
            }
            authenticatedUser
                .post('/api/club/create')
                .send(club)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('All Fields required');
                    authenticatedUser
                        .get('/api/user/profile')
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.clubs.length.should.be.eql(0);
                            done();
                        })
                });
        });
        it('should not add a club to the user when name is missing and user is logged in', function (done) {
            let club = {
                "type": "Culture",
                "university": "5ba7090d8046d72680a34505",
            }
            authenticatedUser
                .post('/api/club/create')
                .send(club)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('All Fields required');
                    authenticatedUser
                        .get('/api/user/profile')
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.clubs.length.should.be.eql(0);
                            done();
                        })
                });

        });
        it('should not add a club to the user when university is missing and user is logged in', function (done) {
            let club = {
                "name": "Culture Club",
                "type": "Culture",
            }
            authenticatedUser
                .post('/api/club/create')
                .send(club)
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('All Fields required');
                    authenticatedUser
                        .get('/api/user/profile')
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.clubs.length.should.be.eql(0);
                            done();
                        })
                });

        });
        it('should not add a club to the user when another club with same name, university exist and user is logged in', function (done) {
            let clubOne = {
                "type": "Culture",
                "name": "Culture Club",
                "university": "5ba7090d8046d72680a34505",
            }
            let clubTwo = {
                "type": "Culture",
                "name": "Culture Club",
                "university": "5ba7090d8046d72680a34505",
            }
            authenticatedUser
                .post('/api/club/create')
                .send(clubOne)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id')
                    // Add 2nd club
                    authenticatedUser
                        .post('/api/club/create')
                        .send(clubTwo)
                        .end(function (err, res) {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.have.property('error').eql('Club Already Exists');
                            done();
                        })
                });

        });
        it('should add a club to the user when another club with same name but different university exist and user is logged in', function (done) {
            let clubOne = {
                "type": "Culture",
                "name": "Culture Club",
                "university": "5ba7090d8046d72680a34505",
            }
            let clubTwo = {
                "type": "Culture",
                "name": "Culture Club",
                "university": "5bb9a7b3b9ed7556846d56c0",
            }
            authenticatedUser
                .post('/api/club/create')
                .send(clubOne)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id')
                    // Add 2nd club
                    authenticatedUser
                        .post('/api/club/create')
                        .send(clubTwo)
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id')
                            done();
                        })
                });

        });
        it('should not add a club to the user when the user is not logged in', function (done) {
            let club = {
                "type": "Culture",
                "name": "Culture Club",
                "university": "5ba7090d8046d72680a34505",
            }
            chai.request(server)
                .post('/api/club/create')
                .send(club)
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('You are unauthorised to see this page');
                    done();
                });
        });
    });

    describe('Club Details', function () {
        let userTwo = {
            email: "jane.smith@gmail.com",
            password: "Test1234",
        }

        let authenticatedUserTwo = request.agent(server);

        let club = {
            "type": "Culture",
            "name": "Culture Club",
            "university": "5ba7090d8046d72680a34505",
        }

        let clubTwo = {
            "type": "Sports",
            "name": "Sports Club",
            "university": "5ba7090d8046d72680a34505",
        }

        beforeEach(done => {
            Clubs.remove({}, err => {
                authenticatedUser
                    .post('/api/club/create')
                    .send(club)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('_id');
                        club._id = res.body._id;
                        authenticatedUserTwo
                            .post('/api/user/login')
                            .send(userTwo)
                            .end(function (err, res) {
                                user._id = res.body._id;
                                authenticatedUserTwo
                                    .post('/api/club/create')
                                    .send(clubTwo)
                                    .end(function (err, res) {
                                        res.body.should.have.property('_id');
                                        clubTwo._id = res.body._id;
                                        done();
                                    });
                            });
                    })
            });
        });

        it('should get all the clubs details the user is in and not any other clubs', function (done) {
            authenticatedUser.
                get('/api/club')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(1);
                    res.body[0].should.have.property('_id').eql(club._id);
                    res.body[0].should.have.property('type').eql(club.type);
                    res.body[0].should.have.property('university').eql(club.university);
                    authenticatedUserTwo.
                        get('/api/club')
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eq(1);
                            res.body[0].should.have.property('_id').eql(clubTwo._id);
                            done();
                        });
                });
        });
        it('should get the clubs details of a specific id which the user is in ', function (done) {
            authenticatedUser.
                get(`/api/club/${club._id}`)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('_id').eql(club._id);
                    res.body.should.have.property('type').eql(club.type);
                    res.body.should.have.property('university').eql(club.university);
                    done();
                });
        });
        it('should not get the clubs details of a specific id which the user is not in ', function (done) {
            authenticatedUser.
                get(`/api/club/${clubTwo._id}`)
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('error').eql('You are unauthorised to see this page');
                    done();
                });
        });
    });
});

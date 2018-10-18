import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import Events from '../server/model/events';
import Users from '../server/model/users';
import request from 'supertest';

let should = chai.should();

chai.use(chaiHttp);

describe('Events', function() {
    const user = {
        email: 'john.smith@gmail.com',
        password: 'Test1234',
    }

    let authenticatedUser = request.agent(server);

    beforeEach((done) => {
        Users.remove({}, (err) => {
            // Login User
            Users.insertMany([
                {
                    clubs: [],
                    email: "john.smith@gmail.com",
                    firstName: "John",
                    lastName: "Smith",
                    password: "$2b$10$pVVILKdJ/kyyF1RUlTyEouO.7xHyDMbBbKpcpyOjtqgZn.x.rGBKu"
                },
            ], function (err) {
                authenticatedUser
                    .post('/api/user/login')
                    .send(user)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        user._id = res.body._id;
                        done();
                    });
            })
        })
    })

    describe('Create an event', function() {
        beforeEach(done => {
            Events.remove({}, err => {
                done();
            })
        });

        it('should create an event with all fields filled out and user is logged in', function (done) {
            const event = {
                clubId: '5ba6df946695553b38e2098d',
                name: 'new event',
                description: 'event description',
                date: '2018-10-18T15:26:07.493Z',
                createdBy: '5ba6d9a367c37124881cca5c',
            };
            
            authenticatedUser
                .post('/api/event/')
                .send(event)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('club_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('date');
                    res.body.should.have.property('created_by');
                    authenticatedUser
                        .get('/api/user/profile')
                        .end(function (err, res) {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        })
                });
        });

        it('should not create an event when fields are missing', function (done) {
            const event = {
                club_id: '5ba7090d8046d72680a34505',
                name: 'new event',
                createdBy: '5ba7090d8046d72680a34505',
            };

            authenticatedUser
                .post('/api/event/')
                .send(event)
                .end(function(err, res) {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('MISSING_FIELDS');
                    done();
                });
        });

        it('should not create an event when user is not logged in', function (done) {
            const event = {
                club_id: '5ba7090d8046d72680a34505',
                name: 'new event',
                description: 'event description',
                date: '2018-10-18T15:26:07.493Z',
                createdBy: '5ba7090d8046d72680a34505',
            };

            chai.request(server)
                .post('/api/event/')
                .send(event)
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('You are unauthorised to see this page');
                    done();
                });
        });
    })

    describe('Get upcoming events', function() {
        const upcomingDate = new Date();
        upcomingDate.setDate(upcomingDate.getDate() + 1);
        const upcomingEvent = {
            club_id: '5ba7090d8046d72680a34505',
            name: 'upcoming event',
            description: 'event description',
            date: upcomingDate.toISOString(),
            createdBy: '5ba7090d8046d72680a34505',
        }

        const secondUpcomingEvent = {
            club_id: '5ba7090d8046d72680a34505',
            name: 'upcoming event',
            description: 'event description',
            date: upcomingDate.toISOString(),
            createdBy: '5ba7090d8046d72680a34505',
        }

        const thirdUpcomingEvent = {
            club_id: '5ba7090d8046d72680a34505',
            name: 'upcoming event',
            description: 'event description',
            date: upcomingDate.toISOString(),
            createdBy: '5ba7090d8046d72680a34505',
        }

        const fourthUpcomingEvent = {
            club_id: '5ba7090d8046d72680a34505',
            name: 'upcoming event',
            description: 'event description',
            date: upcomingDate.toISOString(),
            createdBy: '5ba7090d8046d72680a34505',
        }

        const pastEvent = {
            club_id: '5ba7090d8046d72680a34505',
            name: 'past event',
            description: 'event description',
            date: '2018-10-18T15:26:07.493Z',
            createdBy: '5ba7090d8046d72680a34505',
        }
        
        beforeEach(done => {
            Events.remove({}, err => {
                authenticatedUser
                    .post('/api/event')
                    .send(upcomingEvent);
                authenticatedUser
                    .post('/api/event')
                    .send(pastEvent);
                authenticatedUser
                    .post('/api/event')
                    .send(secondUpcomingEvent);
                authenticatedUser
                    .post('/api/event')
                    .send(thirdUpcomingEvent);
                authenticatedUser
                    .post('/api/event')
                    .send(fourthUpcomingEvent);
                done();
            });
        });

        it('should get only upcoming events', function() {
            authenticatedUser
                .get('/api/event/upcoming')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(3);
                    res.body[0].should.be.a('object');
                    res.body[0].name.should.equal(upcomingEvent.name);
                    res.body[0].club_id._id.should.equal(upcomingEvent.club_id);
                })
        })

        it('should only return three events', function() {
            authenticatedUser
                .get('/api/event/upcoming')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(3);
                })
        })
    })
})
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';
import Events from '../server/model/events';
import Users from '../server/model/users';
import request from 'supertest';
import ResponseChecks from './common-responses-checks';

let should = chai.should();

chai.use(chaiHttp);

describe('Events', function () {
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
                        ResponseChecks.validUser(res, user);
                        done();
                    });
            })
        })
    })

    describe('Create an event', function () {
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
                .end(function (err, res) {
                    ResponseChecks.validEvent(res);
                    done();

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
                .end(function (err, res) {
                    ResponseChecks.missingFields(res);
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
                    ResponseChecks.unauthorised(res);
                    done();
                });
        });
    });
});
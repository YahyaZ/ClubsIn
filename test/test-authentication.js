import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../server/server';
import User from '../server/model/users';
import ResponseChecks from './common-responses-checks';
/* global describe before afterEach it res */

const should = chai.should();

chai.use(chaiHttp);


describe('Authentication', () => {
    const user = {
        email: 'john.smith@gmail.com',
        password: 'Test1234',
    };

    const authenticatedUser = request.agent(server);

    before((done) => {
        User.remove({}, (err) => {
            User.insertMany([
                {
                    clubs: [], email: 'john.smith@gmail.com', firstName: 'John', lastName: 'Smith', password: '$2b$10$pVVILKdJ/kyyF1RUlTyEouO.7xHyDMbBbKpcpyOjtqgZn.x.rGBKu',
                },
            ], (userError) => {
                authenticatedUser
                    .post('/api/user/login')
                    .send(user)
                    .end((authenticatedError, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

    afterEach((done) => {
        chai.request(server)
            .get('/api/user/logout')
            .end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.empty;
                done();
            });
    });

    it('Should get authenticated profile when logged in', (done) => {
        authenticatedUser
            .get('/api/user/profile')
            .end((err, res) => {
                ResponseChecks.validUser(res, user);
                done();
            });
    });

    it('Should not get authenticated profile when not logged in', (done) => {
        chai.request(server)
            .get('/api/user/profile')
            .end((err, res) => {
                ResponseChecks.unauthorised(res);
                done();
            });
    });
    it('Should not get authenticated profile when log in attempt is incorrect', (done) => {
        const user = {
            email: 'john.smith@gmail.com',
            password: 'Test123',
        };
        chai.request(server)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                chai.request(server)
                    .get('/api/user/profile')
                    .end((error, response) => {
                        ResponseChecks.unauthorised(response);
                        done();
                    });
            });
    });
});

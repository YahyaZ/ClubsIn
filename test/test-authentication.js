import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../server/server';
import User from '../server/model/users';
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

    it('Should not get authenticated profile when not logged in', (done) => {
        chai.request(server)
            .get('/api/user/profile')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.a.property('error').eql('You are unauthorised to see this page');
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
                        response.should.have.status(401);
                        response.body.should.be.a('object');
                        response.body.should.have.a.property('error').eql('You are unauthorised to see this page');
                        done();
                    });
            });
    });
});

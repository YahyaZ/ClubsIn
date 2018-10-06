import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server'
import User from '../server/model/users';
import request from 'supertest';

let should = chai.should();

chai.use(chaiHttp);


describe('Authentication', function () {
    let user = {
        email: "john.smith@gmail.com",
        password: "Test1234",
    }

    let authenticatedUser = request.agent(server);

    before((done) => {
        User.remove({}, (err) => {
            User.insertMany([
                { "clubs": [], "email": "john.smith@gmail.com", "firstName": "John", "lastName": "Smith", "password": "$2b$10$pVVILKdJ/kyyF1RUlTyEouO.7xHyDMbBbKpcpyOjtqgZn.x.rGBKu" },
            ], function (err) {
                authenticatedUser
                    .post('/api/user/login')
                    .send(user)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    }
                    );

            });
        });
    });

    afterEach((done) => {
        chai.request(server)
            .get('/api/user/logout')
            .end(function (err, res) {
                res.should.have.status(204);
                res.body.should.be.empty;
                done();
            });
    });

    it('Should get authenticated profile when logged in', function (done) {
        authenticatedUser
            .get('/api/user/profile')
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

    it('Should not get authenticated profile when not logged in', function (done) {
        chai.request(server)
            .get('/api/user/profile')
            .end(function (err, res) {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.a.property('error').eql('You are unauthorised to see this page');
                done();
            });
    });
    it('Should not get authenticated profile when log in attempt is incorrect', function (done) {
        let user = {
            email: "john.smith@gmail.com",
            password: "Test123",
        }
        chai.request(server)
            .post('/api/user/login')
            .send(user)
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/user/profile')
                    .end(function (err, res) {
                        res.should.have.status(401);
                        res.body.should.be.a('object');
                        res.body.should.have.a.property('error').eql('You are unauthorised to see this page');
                        done();
                    });
            });
    });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server'
import University from '../server/model/universities'
import ResponseChecks from './common-responses-checks';

let should = chai.should();

chai.use(chaiHttp);


describe('Universities', function () {
    before((done) => {
        University.remove({}, (err) => {
            University.insertMany([
                { "name": "University of Technology Sydney", "abbreviation": "UTS" },
                { "name": "University of New South Wales", "abbreviation": "UNSW" },
                { "name": "University of Sydney", "abbreviation": "USYD" }], function (err) {
                    done();
                }
            );

        });
    });

    describe('Get All Universities', function () {
        it('should get ALL the universities', function (done) {
            chai.request(server)
                .get('/api/university')
                .end(function (err, res) {
                    ResponseChecks.validUniversities(res, 3);
                    done();
                });

        });
    });
});
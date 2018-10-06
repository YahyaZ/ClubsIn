import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server'
import University from '../server/model/universities'

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
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                    res.body[0].should.be.a('object');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('abbreviation');

                    done();
                });

        });
    });
});
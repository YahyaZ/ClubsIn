import chai from 'chai';
const should = chai.should();

function validUser(res, user) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.a.property('email').eql(user.email);
    res.body.should.have.a.property('firstName');
    res.body.should.have.a.property('lastName');
    res.body.should.have.a.property('_id');
    res.body.should.have.a.property('clubs');
    res.body.should.not.have.a.property('password');
}

function incorrectLogin(res) {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.not.have.a.property('username');
    res.body.should.have.a.property('error').eql('INCORRECT_EMAIL_PASS');
}

function missingFields(res) {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.not.have.a.property('_id');
    res.body.should.have.a.property('error').eql('MISSING_FIELDS');
}

function userSignUp(res, user) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.a.property('email').eql(user.email);
    res.body.should.have.a.property('firstName');
    res.body.should.have.a.property('lastName');
    res.body.should.have.a.property('_id');
    res.body.should.have.a.property('clubs');
    res.body.clubs.length.should.be.eql(0);
    res.body.should.not.have.a.property('password');
}

function passwordMismatch(res) {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.not.have.a.property('_id');
    res.body.should.have.a.property('error').eql('PASSWORD_MISMATCH');
}

function emptyBody(res) {
    res.should.have.status(204);
    res.body.should.be.empty;
}

function existingLogin(res) {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.not.have.a.property('_id');
    res.body.should.have.a.property('error').eql('EXISTING_USER');
}

function unauthorised(res) {
    res.should.have.status(401);
    res.body.should.be.a('object');
    res.body.should.have.a.property('error').eql('You are unauthorised to see this page');
}

function validNewClub(res, user) {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('_id');
    res.body.should.have.property('users');
    res.body.users.length.should.be.eql(1);
    res.body.should.have.property('type');
    res.body.should.have.property('name');
    res.body.should.have.property('university');
    res.body.should.have.property('link');
}

function userClubs(res, club){
    res.should.have.status(200);
    res.body.should.be.a('array');
    res.body.length.should.be.eq(1);
    res.body[0].should.have.property('type').eql(club.type);
    res.body[0].should.have.property('university').eql(club.university);
}

function clubExists(res) {
    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('error').eql('CLUB_EXISTS');
}

function singleClub(res, club){
    res.should.have.status(200);
    res.body.should.be.a('Object');
    res.body.should.have.property('_id').eql(club._id);
    res.body.should.have.property('type').eql(club.type);
    res.body.should.have.property('university').eql(club.university);
}

function singleClubQuery(res, club){
    res.should.have.status(200);
    res.body.should.be.a('array');
    res.body[0].should.have.property('_id').eql(club._id);
    res.body[0].should.have.property('name')
    res.body[0].should.not.have.property('university');
}

function validLink(res){
    res.should.have.status(200);
    res.body.should.have.property('_id');
    res.body.should.have.property('link');
}

function validEvent(res){
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('club_id');
    res.body.should.have.property('name');
    res.body.should.have.property('description');
    res.body.should.have.property('date');
    res.body.should.have.property('created_by');
}

function upcomingEvents(res,upcomingEvent,length){
    res.should.have.status(200);
    res.body.should.be.a('array');
    res.body.should.have.length(length);
    res.body[0].should.be.a('object');
    res.body[0].name.should.equal(upcomingEvent.name);
    res.body[0].club_id._id.should.equal(upcomingEvent.club_id);
}

function validUniversities(res, length){
    res.should.have.status(200);
    res.body.should.be.a('array');
    res.body.length.should.be.eql(length);
    res.body[0].should.be.a('object');
    res.body[0].should.have.property('name');
    res.body[0].should.have.property('abbreviation');
}

export default {
    validUser,
    missingFields,
    userSignUp,
    passwordMismatch,
    emptyBody,
    incorrectLogin,
    existingLogin,
    unauthorised,
    validNewClub,
    clubExists,
    userClubs,
    singleClub,
    singleClubQuery,
    validLink,
    validEvent,
    upcomingEvents,
    validUniversities,
}
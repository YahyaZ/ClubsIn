import University from '../model/universities';

function getUniversities(req, res, next) {
    University.find({}, (err, universities) => {
        res.send(universities);
    });
}

module.exports = {
    getUniversities,
};

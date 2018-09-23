import University from '../model/universities';

function getUniversities(req, res, next){
    University.find({}, function(err, universities){
        res.send(universities);
    })
}

module.exports = {
    getUniversities: getUniversities,
}

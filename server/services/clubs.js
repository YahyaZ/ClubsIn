import Club from '../model/clubs';

function createClub(req, res, next) {
    var clubData = {
        name: req.body.clubName,
        type: req.body.clubType,
        university: req.body.university,
    }

    // Checks if the club is existing or not, if it doesnt, add it
    Club.findOne({ name: clubData.name, university: clubData.university }, function (err, club) {
        if (err) {
            console.log(err);
        }
        // Club Exists, so return Club Already exists
        if (club) {
            res.status(400).json({ "error": "Club Already Exists" })
        } else {
            // No club is found, so create it
            Club.create(clubData, function (error, club) {
                if (error) {
                    error.status = 400;
                    return next(error);
                } else {
                    req.session.clubId = club._id;
                    return res.json(club)
                }
            });
        }
    });
}

module.exports = {
    createClub: createClub,
}

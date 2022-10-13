const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

//GET: /trips to return all trips in a list
const tripsList = async (req, res) => {
    Trip
        .find({}) //empty filter to get all
        .exec((err, trips) => {
            if (!trips) {
                return res
                .status(404) //no trips error
                .json({"message": "No trips found"});
            } else if (err) {
                return res
                .status(404) //generic error
                .json(err);
            } else {
                return res
                .status(200) //set 200 status for success
                .json(trips);
            }
        });
};

//GET: /trips/:tripCode to return a single trip info
const tripsFindByCode = async (req, res) => {
    Trip
    .find({ 'code': req.params.tripCode}) //filter for the code
        .exec((err, trip) => {
            if (!trip) {
                return res
                .status(404) //no trips error
                .json({"message": "That trip not found"});
            } else if (err) {
                return res
                .status(404) //generic error
                .json(err);
            } else {
                return res
                .status(200) //set 200 status for success
                .json(trip);
            }
        });
}

const tripsAddTrip = async (req, res) => {
    console.log('tripsAddTrip invoked with: \n' + req.body);
    getUser(req, res, 
        (req, res) => {
    Trip
        .create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
        (err, trip) => {
            if (err) {
                return res
                    .status(400) //bad request
                    .json(err);
            } else {
                return res
                    .status(201) //success
                    .json(trip);
            }
        });
    }
    )
}

const tripsUpdateTrip = async (req, res) => {
    console.log(req.body);
    getUser(req, res, 
        (req, res) => {
    Trip
        .findOneAndUpdate({ 'code': req.params.tripCode }, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true })
        .then(trip => {
            if (!trip) {
                return res
                    .status(404) //no trip found
                    .send({
                        message: "Trip Not found with code " + req.params.tripCode
                    });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            return res
                .status(500) //server error
                .json(err)
        });
    }
    )
}

const getUser = (req, res, callback) => {
    if (req.payload && reqw.payload.email) {
        User
        .findOne({ email: req.payload.email})
        .exec((err, user) => {
            if (!user) {
                return res
                    .status(404) //no user
                    .json({ "message": "User not found"});
            } else if (err) {
                console.log(err);
                return res
                    .status(404) //error
                    .json(err)
            }
            callback(req, res, user.name);
        });
    } else {
        return res
            .status(404)
            .json({"message": "User not found"});
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
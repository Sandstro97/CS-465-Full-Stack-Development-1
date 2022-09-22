const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'));

/* GET travel view */
const travel = (req, res) => {
    console.log(req.path);
    //NOT WORKIGN pageTitle = process.env.npm_package_description + ' - Travel';
    res.render('travel', {title: 'Travlr Getaways - Travel', trips });
};

module.exports = {
    travel
};
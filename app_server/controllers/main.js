/*GET homepage */
const index = (req, res) => {
    console.log(req.path);
    // NOT WORKINg pageTitle = process.env.npm_package_description + ' - Travel';
    res.render('index', {title: 'Travlr Getaways - Home' });
};
module.exports = {
    index
};
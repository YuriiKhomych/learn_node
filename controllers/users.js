var User = require("../models/User");

module.exports.controller = (app) => {
    // get all users
    app.get('/users', (req, res) => {
        User.find({}, 'name email', (error, users) => {
            if (error) {console.log(error);}
            res.send(users);
        })
    });
    // get single user
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, 'name email', (error, user) => {
            if (error) {console.log(error);}
            res.send(user);
        })
    });
    app.post('/users', (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
        })
        user.save((error, user) => (error, user) => {
            if (error) {console.log(error);}
            res.send(user);
        })
    });
}
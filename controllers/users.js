var User = require("../models/User");

module.exports.controller = (app) => {
    // Get all users
    app.get('/users', (req, res) => {
        User.find({}, 'name email', (error, users) => {
            if (error) { console.log(error); }
            res.send(users);
        })
    })
    // Get single user
    app.get('/users/:id', (req, res) => {
        User.findById(req.params.id, 'name email', (error, user) => {
            if (error) { console.log(error); }
            res.send(user);
        })
    })
    // Create user
    app.post('/users', (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
        })
        user.save((error, user) => {
            if (error) { console.log(error); }
            res.send(user);
        })
    })
    // Update user
    app.put('/users/:id', (req, res) => {
        User.findById(req.params.id, 'name email', (error, user) => {
            if (error) { console.log(error); }
            user.name = req.body.name
            user.email = req.body.email
            user.save((error, user) => {
                if (error) { console.log(error); }
                res.send(user)
            })
        })
    })
    app.delete('/users/:id', (req, res) => {
        User.remove({
            _id: req.params.id
        }, (error, user) => {
            if (error) { console.log(error); }
            res.send({ success: true })
        })
    })
}
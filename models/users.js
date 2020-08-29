const mongoose = require('mongoose')

const Schema = new mongoose.Schema

const UserSchema = new Schema({
    name: String,
    email: String,
})

const User = mongoose.Model("User", UserSchema)
module.exports = User
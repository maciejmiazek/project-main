const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    endWorkTime: Number,
    machine: Array,
    phone: String,
    salary: Number,
    startWorkTime: Number,
})

const UserModel = mongoose.model('users', userSchema)
module.exports = UserModel
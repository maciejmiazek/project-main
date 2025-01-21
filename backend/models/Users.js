const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    endWorkTime: { type: String, required: true, },
    machine: { type: Array },
    phone: { type: String, required: true, },
    salary: { type: Number, required: true, },
    startWorkTime: { type:  String, required: true, },
})

const userAddSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value && value.length >= 3;
            },
            message: 'Imię i nazwisko musi zawierać co najmniej 3 znaki'
        }
    },
    endWorkTime: { type: String, required: true },
    machine: { type: Array },
    phone: { 
        type: String, 
        validate: { 
            validator: function (value) { 
                return value === "" || (value && value.match(/\d{3}-\d{3}-\d{3}/))
            }, 
            message: 'Niepoprawny format numeru telefonu' 
        }
    },
    salary: { type: Number, required: true },
    startWorkTime: { type: String, required: true },
})

const UserModel = mongoose.model('users', userSchema, 'users')
const UserAddModel = mongoose.model('userAdd', userAddSchema, 'users')

module.exports = { UserModel, UserAddModel }
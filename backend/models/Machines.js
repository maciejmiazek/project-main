const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    isUsingSince: { type:  String},
    capacity: { type: Number, required: true, },
    usingWorker: { type: String },
    description: { type: String },
    imgUrl: { type: String },
})

const machineAddSchema = new mongoose.Schema({
    
})

const MachineModel = mongoose.model('machines', machineSchema, 'machines')
const MachineAddModel = mongoose.model('machinesAdd', machineAddSchema, 'machines')

module.exports = { MachineModel, MachineAddModel }
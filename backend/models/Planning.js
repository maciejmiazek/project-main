const mongoose = require('mongoose');

const PlanningSchema = new mongoose.Schema({
    workerId: { type: String, required: true, },
    startDate: { type:  Date, required: true,},
    endDate: { type:  Date, required: true,},
    description: { type: String },
    machineId: { type: String },
})

const PlanningAddSchema = new mongoose.Schema({
    workerId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Odwołanie do startDate przez "this"
                return value && value > this.startDate;
            },
            message: 'Data zakończenia musi być późniejsza niż data rozpoczęcia',
        },
    },
    description: { type: String },
    machineId: { type: String },
});

const PlanningModel = mongoose.model('plannings', PlanningSchema, 'planning')
const PlanningAddModel = mongoose.model('planningsAdd', PlanningAddSchema, 'planning')

module.exports = { PlanningModel, PlanningAddModel }
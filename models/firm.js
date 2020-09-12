const mongoose = require("mongoose")

const firmSchema = new mongoose.Schema({
    firmName: {
        type: String,
        required: true
    },
    cellNumber: {
        type: Number,
        required: true
    },
    groupCode: {
        type: Number,
        required: true,
    },
    telecomNumber: {
        type: Number,
        required: true,
    },
    registrationDate: {
        type: Date,
        required: true,
    },
    loginCount: {
        type: Number,
        required: true,

    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
})


module.exports = mongoose.model('Firm', firmSchema)
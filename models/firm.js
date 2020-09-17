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
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
})


module.exports = mongoose.model('Firm', firmSchema)
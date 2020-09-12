const mongoose = require("mongoose")
const { ObjectId } = require("mongodb")

const enquirySchema = new mongoose.Schema({
    buyerFirmId: {
        type: ObjectId,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    formShape: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('Enquiry', enquirySchema)
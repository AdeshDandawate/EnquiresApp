const mongoose = require("mongoose")
const { ObjectId } = require("mongodb")

const quotationSchema = new mongoose.Schema({
    sellerFirmId: {
        type: ObjectId,
        required: true
    },
    enquiryId: {
        type: ObjectId,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model('Quotation', quotationSchema)
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const url = 'mongodb://localhost/EnquiriesDB'

const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
    console.log("Connected...");
})

const registrationRouter = require('./routes/firm')
app.use('/firms', registrationRouter)
const enquiryRouter = require('./routes/enquiry')
app.use('/enquiries', enquiryRouter)
const quotationRouter = require('./routes/quotation')
app.use('/quotations', quotationRouter)

app.listen(9000, () => {
    console.log("Server Started and listening on 9000")
})
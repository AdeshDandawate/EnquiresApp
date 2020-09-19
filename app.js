const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//onst url = 'mongodb://localhost/EnquiriesDB'
const url = process.env.CUSTOMCONNSTR_AzureMongoConnection

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

app.listen(8080, () => {
    console.log("Server Started and listening on 9000")
})
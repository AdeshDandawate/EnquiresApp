const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//const url = 'mongodb://localhost/EnquiriesDB'
const url = 'mongodb://biztrack-mongodb:m1vKtk7LoEmrGxFxcaqcJkduzwska3OWtW2UtGvtWa5JBj1SsYrgoreEY3lh7DCbKnGO1F5GFr7oIe8rmZTShQ==@biztrack-mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@biztrack-mongodb@/EnquiriesDB'

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
    console.log("Server Started and listening on 8080")
})
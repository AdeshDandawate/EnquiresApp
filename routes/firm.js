const express = require("express")
const { Router } = require("express")
const Firm = require('../models/firm')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const firms = await Firm.find()
        res.json(firms)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const firm = await Firm.findById(req.params.id)
        res.json(firm)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const firm = await Firm.findByIdAndDelete(req.params.id)
        res.json(firm)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const firm = await Firm.findById(req.params.id)
        firm.firmName = req.body.firmName
        const e1 = await firm.save()
        res.json(e1)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.post('/', async (req, res) => {
    console.log("*********************************")
    const firm = new Firm({
        firmName: req.body.firmName,
        cellNumber: req.body.cellNumber,
        groupCode: req.body.groupCode,
        telecomNumber: req.body.telecomNumber,
        registrationDate: req.body.registrationDate,
        loginCount: req.body.loginCount,
        isActive: req.body.isActive
    })
    try {
        const a1 = await firm.save()
        console.log({ "id": a1._id })
        res.send({ "id": a1._id })
    } catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router
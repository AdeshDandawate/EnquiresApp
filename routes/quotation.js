const express = require("express")
const { Router } = require("express")
const Quotation = require('../models/quotation')
const jwt = require("Jsonwebtoken")
const router = express.Router()

//protect
router.get('/', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const quotations = await Quotation.find()
                res.json(quotations)
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
})
//protect
router.get('/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const quotation = await Quotation.findById(req.params.id)
                res.json(quotation)
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
})

//protect
router.delete('/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const quotation = await Quotation.findByIdAndDelete(req.params.id)
                res.json(quotation)
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
})

// router.patch('/:id', async (req, res) => {
//     try {
//         const quotation = await Quotation.findById(req.params.id)
//         quotation.rate = req.body.rate
//         const e1 = await quotation.save()
//         res.json(e1)
//     } catch (err) {
//         res.send('Error ' + err)
//     }
// })

//get token
router.post('/', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const quotation = new Quotation({
                sellerFirmId: req.body.sellerFirmId,
                enquiryId: req.body.enquiryId,
                rate: req.body.rate,
                remarks: req.body.remarks
            })
            try {
                const a1 = await quotation.save()
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
})

router.patch('/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

        }
    })
    const quotation = await Quotation.findById(req.params.id)
    if (quotation == null) {
        quotation = new Quotation({
            sellerFirmId: req.body.sellerFirmId,
            enquiryId: req.body.enquiryId,
            rate: req.body.rate,
            remarks: req.body.remarks
        })
        try {
            const a1 = await quotation.save()
            res.json(a1)
        } catch (err) {
            res.send('Error ' + err)
        }
    } else {
        if (req.body.sellerFirmId != null || req.body.sellerFirmId != "") {
            quotation.sellerFirmId = req.body.sellerFirmId
        } if (req.body.enquiryId != null || req.body.enquiryId != "") {
            quotation.enquiryId = req.body.enquiryId
        } if (req.body.rate != null || req.body.rate != "") {
            quotation.rate = req.body.rate
        } if (req.body.remarks != null || req.body.remarks != "") {
            quotation.remarks = req.body.remarks
        }
        try {
            const a1 = await quotation.save()
            res.json(a1)
        } catch (err) {
            res.send('Error ' + err)
        }
    }
})

//Token bearer <TOKEN>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken
        next();
    } else {
        res.sendStatus(403);
    }
}
module.exports = router
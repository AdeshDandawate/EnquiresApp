const express = require("express")
const { Router } = require("express")
const Enquiry = require('../models/enquiry')
const jwt = require("Jsonwebtoken")


const router = express.Router()

router.get('/', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const enquiries = await Enquiry.find()
                res.json(enquiries)
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
})

router.get('/:id', verifyToken,async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const enquiry = await Enquiry.findById(req.params.id)
                res.json(enquiry)
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
})

router.delete('/:id', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const enquiry = await Enquiry.findByIdAndDelete(req.params.id)
                res.json(enquiry)
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
            try {
                const enquiry = await Enquiry.findById(req.params.id)
                enquiry.grade = req.body.grade
                const e1 = await enquiry.save()
                res.json(e1)
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
})

router.post('/', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const enquiry = new Enquiry({
                buyerFirmId: req.body.buyerFirmId,
                grade: req.body.grade,
                formShape: req.body.formShape,
                description: req.body.description
            })
            try {
                const a1 = await enquiry.save()
                res.json(a1)
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
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
const express = require("express")
const { Router } = require("express")
const Firm = require('../models/firm')
const jwt = require("Jsonwebtoken")
const router = express.Router()

router.get('/', verifyToken, async (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const firms = await Firm.find()
                res.json(firms)
            } catch (err) {
                res.send('Error ' + err)
            }

        }
    })
})

router.get('/:id', verifyToken, async (req, res) => {

    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            try {
                const firm = await Firm.findById(req.params.id)
                res.json(firm)
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
                const firm = await Firm.findByIdAndDelete(req.params.id)
                res.json(firm)
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
                const firm = await Firm.findById(req.params.id)
                firm.firmName = req.body.firmName
                const e1 = await firm.save()
                res.json(e1)
            } catch (err) {
                res.send('Error ' + err)
            }
        }
    })
})

router.post('/', async (req, res) => {
    console.log("*********************************")
    try {
        const query = req.body.firmName;
        const firms = await Firm.findOne({ firmName: query }, async function (err, firm) {
            if (err) console.log(err);
            if (firm) {
                console.log("This has already been saved");
                res.send("You are already registered with this username")
            } else {
                const firm = new Firm({
                    firmName: req.body.firmName,
                    cellNumber: req.body.cellNumber,
                    groupCode: req.body.groupCode,
                    telecomNumber: req.body.telecomNumber,
                    registrationDate: req.body.registrationDate,
                    loginCount: req.body.loginCount,
                    isActive: req.body.isActive
                })
                firm.save(function (err, firm) {
                    if (err) console.log(err)
                    else {
                        jwt.sign({ firm }, 'secretkey', (err, token) => {
                            res.json({ token })
                            console.log("New Firm created");

                        })
                    }
                });

            }
        });
    } catch (err) {
        res.send('Error ' + err)
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
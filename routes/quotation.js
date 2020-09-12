const express = require("express")
const { Router } = require("express")
const Quotation=require('../models/quotation')

const router=express.Router()

router.get('/',async (req,res)=>{
    try{
        const quotations= await Quotation.find()
        res.json(quotations)
    }catch(err){
        res.send('Error '+err)
    }
})

router.get('/:id',async (req,res)=>{
    try{
        const quotation= await Quotation.findById(req.params.id)
        res.json(quotation)
    }catch(err){
        res.send('Error '+err)
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const quotation= await Quotation.findByIdAndDelete(req.params.id)
        res.json(quotation)
    }catch(err){
        res.send('Error '+err)
    }
})

router.patch('/:id',async (req,res)=>{
    try{
        const quotation= await Quotation.findById(req.params.id)
        quotation.sellerFirmId=req.body.sellerFirmId
        const e1=await quotation.save()
        res.json(e1)
    }catch(err){
        res.send('Error '+err)
    }
})

router.post('/',async (req,res)=>{
    const quotation=new Quotation({
        sellerFirmId:req.body.sellerFirmId,
        enquiryId:req.body.enquiryId,
        rate:req.body.rate,
        remarks:req.body.remarks
    })
    try{
        const a1= await quotation.save()
        res.json(a1)
    }catch(err){
        res.send('Error '+err)
    }
})

module.exports = router
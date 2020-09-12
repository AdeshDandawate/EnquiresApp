const express = require("express")
const { Router } = require("express")
const Enquiry=require('../models/enquiry')

const router=express.Router()

router.get('/',async (req,res)=>{
    try{
        const enquiries= await Enquiry.find()
        res.json(enquiries)
    }catch(err){
        res.send('Error '+err)
    }
})

router.get('/:id',async (req,res)=>{
    try{
        const enquiry= await Enquiry.findById(req.params.id)
        res.json(enquiry)
    }catch(err){
        res.send('Error '+err)
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const enquiry= await Enquiry.findByIdAndDelete(req.params.id)
        res.json(enquiry)
    }catch(err){
        res.send('Error '+err)
    }
})

router.patch('/:id',async (req,res)=>{
    try{
        const enquiry= await Enquiry.findById(req.params.id)
        enquiry.grade=req.body.grade
        const e1=await enquiry.save()
        res.json(e1)
    }catch(err){
        res.send('Error '+err)
    }
})

router.post('/',async (req,res)=>{
    const enquiry=new Enquiry({
        buyerFirmId:req.body.buyerFirmId,
        grade:req.body.grade,
        formShape:req.body.formShape,
        description:req.body.description
    })
    try{
        const a1= await enquiry.save()
        res.json(a1)
    }catch(err){
        res.send('Error '+err)
    }
})

module.exports = router
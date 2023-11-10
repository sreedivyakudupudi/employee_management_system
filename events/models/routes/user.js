const express =require('express');
const mongoose=require('mongoose');
const User=require('../user');
const router=express.Router();
const path=require('path');
const app=express();
app.set("view-engine","pug");
app.set("views",path.join(__dirname,'..','..','..','views'));
router.post('/create',async(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const regno=req.body.regno
    const company=req.body.company
    const role=req.body.role
    const experience=req.body.experience
    const salary=req.body.salary

    if(!name||!email||!regno||!company||!role||!experience||!salary)
    return res.status(200).json("please fill all the details");

    const user=new User({name,email,regno,company,role,experience,salary})

    const exsist= await User.findOne({regno:regno});
    if(exsist)
    return res.status(200).json({
        success:"false",
        message:"this email is already registered try read event"
    })
    const saved=await user.save();
    res.status(200).render('employeeevent.pug');
})
router.post('/read',async(req,res)=>{
    const regno=req.body.regno;
    const exsist=await User.findOne({regno})

    if(!exsist)
    return res.status(200).json({
        success:"false",
        message:"this id is not present"
    })
    res.status(200).render('readevent2.pug',{
        employee:exsist
    })
})
router.post('/delete',async(req,res)=>{
    const regno=req.body.regno;
    const exsist=await User.findOneAndDelete({regno})

    if(!exsist)
    return res.status(200).json({
        success:"false",
        message:"this id is not present"
    })
    if(exsist)
    res.status(200).render('employeeevent.pug');
})
router.post('/update1',async(req,res)=>{
    const regno=req.body.regno;
    const exsist=await User.findOne({regno})

    if(!exsist)
    return res.status(200).json({
        success:"false",
        message:"this id is not present"
    })
    res.status(200).render('updateevent2.pug',{
        employee:exsist
    })
})
router.post('/updateevent2',async(req,res)=>{
    const regno=req.body.regno;
    const name=req.body.name;
    const salary=req.body.salary
    const role=req.body.role
    const experience=req.body.experience
    const doc=await User.findOneAndUpdate({regno:regno},{name:name,salary:salary,role:role,experience:experience})
    console.log(doc.name);
    res.status(200).render('employeeevent.pug');
})
module.exports = router

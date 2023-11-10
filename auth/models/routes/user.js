const User=require('../user');
//require('../db')
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const path=require('path');
const app=express();
app.set("view-engine","pug");
app.set("views",path.join(__dirname,'..','..','..','views'));
/*const {check ,validationresult}=require('express-validator');
const validateteachersignup=[
    check("name","name must be 3 to 20 letters").trim().not().isEmpty().isLength({min:3,max:20}).matches(/^[a-z A-Z]*$/),
    check("email").trim().not().isEmpty().isEmail().normalizeEmail().withMessage("email is invalid"),
    check('password').trim().notEmpty().withMessage('Password required')
    .isLength({ min: 5 }).withMessage('password must be minimum 5 length')
    .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
    .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
    .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
    .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')
    .not().matches(/^$|\s+/).withMessage('White space not allowed'),
    
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
              throw new Error('Password Confirmation does not match password');
         }
         return true;
        })
]
const uservalidate=(req,res,next)=>{
     const result= validationresult(req).array();
     if(!result.length()) return next();
}*/
router.post('/signup',async (req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const regno=req.body.regno
    const company=req.body.company
    const role=req.body.role
    const confirmpassword=req.body.confirmpassword

    if(!name||!email||!password||!regno||!password||!confirmpassword)
    return res.status(200).json("please fill all the details");

    if(password!=confirmpassword)
    return res.status(200).json("password and confirm password does'nt match");
    const exsist= await User.findOne({email:email});
    if(exsist)
    return res.status(200).json({
        success:"false",
        message:"this email is already registered try sign in"
    })
    var user=new User({name,email,password,regno,company,role,password});

    var newuser=await user.save();
    if(newuser)
    res.status(200).render('signin.pug');
    const result=user.comparepassword(password);
    if(result)
    console.log("password and hashed value are matched");
    else
    console.log("password and hashed value dose'nt match");
})
router.post('/signin',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const register= await User.findOne({email:email});
    if(!register)
    return res.status(200).json("email not authenticated please go to sign up");
    const match =bcrypt.compare(password,register.password);
    console.log("signed in");
    if(match)
    res.status(200).render("employeeevent.pug",{
       employeename:register.name
    });
    else
    res.status(200).json("Incorrect Password");

})
module.exports = router
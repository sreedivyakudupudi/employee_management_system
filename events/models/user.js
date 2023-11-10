const mongoose=require('mongoose');
require('./db');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    regno:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true       
    },
    salary:{
        type:Number,
        required:true,
        trim:true,
    },
    experience:{
      type:Number,
      required:true,
      trim:true
    }
})
const user=mongoose.model('employee event',userSchema);

module.exports=user;
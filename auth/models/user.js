const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
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
    password:{
        type:String,
        required:true,
        trim:true
    }
})
userSchema.pre("save",function(next){
    const user=this;
    if(this.isModified("password"))
    {
       bcrypt.hash(user.password,8,(err,hash)=>{
        if(err) {return next(err);}

        user.password=hash;
        next();
       })
    }
    else
    return next();
});
userSchema.methods.comparepassword= async function(password)
{
    try{
        const result=await bcrypt.compare(password,this.password)
        return result
    }catch(error)
    {
        console.log("error in password method",error.message);
    }
    console.log(result);
}
var user = mongoose.model('employeeauth',userSchema); 

module.exports= user
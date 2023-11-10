const { urlencoded } = require("express");
const express=require("express");
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
const port=80;
const fs=require('fs');
const { stringify } = require("querystring");
/*require('./auth/models/db');*/
const userrouter=require('./auth/models/routes/user');
const employeerouter=require('./events/models/routes/user');
app.use('/static',express.static('static'));
app.use(urlencoded());
app.use(express.json());
app.use(userrouter);
app.use(employeerouter);

app.set('view-engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('intro.pug');
})
app.get('/signup',(req,res)=>{
    const title='Employee Registration';
    const params={'title':title};
    res.status(200).render('signup.pug',params);
})
app.get('/signin',(req,res)=>{
    const title='Employee Signin';
    const params={'title':title};
    res.status(200).render('signin.pug',params);
})
app.get('/signin/create',(req,res)=>{
    const title="creating an event";
    const params={'title':title};
    res.status(200).render('createevent.pug',params);
})
app.get('/signin/read',(req,res)=>{
    const title="reading an event";
    const params={'title':title};
    res.status(200).render('readevent.pug',params);
})
app.get('/signin/update',(req,res)=>{
    const title="creating an event";
    const params={'title':title};
    res.status(200).render('updateevent1.pug',params);
})
app.get('/signin/delete',(req,res)=>{
    const title="deleting an event";
    const params={'title':title};
    res.status(200).render('deleteevent.pug',params);
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
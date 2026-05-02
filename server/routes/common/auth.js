const express=require('express');
const Admin =require('../../models/Admin')

const router= express.Router();
const { body, validationResult } = require('express-validator');

var jwt = require('jsonwebtoken');


const JWT_SECRET="Harryisagoodboy";

// ROUTE 1: Authenticate a Admin using:POST "/api/auth/login".No login required
router.post('/login',[ 
    body('password').exists()
],async (req,res)=>{
 let success=false;
  //If there are errors,return Bad request and the errors
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password}=req.body
    try{
        let admin=await Admin.findOne({email});
        
        console.log(admin)

        if(!admin)
        {
          return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        
          
        if(admin.password!=password)
        {
          return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }  
        const data={
        admin:{
            id:admin.id
          }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)  
        success=true;
            

        res.json({success,authtoken}) 
        
       

    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})


module.exports =router
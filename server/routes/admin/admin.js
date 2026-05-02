const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Admin = require('../../models/Admin');


const { body, validationResult } = require('express-validator');


router.post('/addadmin',fetchuser,[
    body('email').isLength({ min: 1 }),
     
    body('password').isLength({ min: 3 })
],async (req,res)=>{
    try {
        let success = false;
        const {email,password}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
      
        const admin=new Admin({
            email,password
        })
        const savedAdmin=await admin.save();
        success=true;
        res.json({success,data:savedAdmin})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router
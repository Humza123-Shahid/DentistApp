const express=require('express');
const router= express.Router();
//var fetchuser=require('../../middleware/fetchuser');
const Social = require('../../models/Social');
const { body, validationResult } = require('express-validator');
var fetchuser=require('../../middleware/fetchuser');

// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallsocials',fetchuser,async (req,res)=>{
     let filter = {};
      if (req.query.filter) {
        const f = JSON.parse(req.query.filter);
        if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
      }
      const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
      const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);
    
      const socials = await Social.find(filter)
        .skip((page - 1) * perPage)
        .limit(perPage);
    
      const total = await Social.countDocuments(filter);
    
      res.json({ data: socials, total });
})
router.get('/fetchmanySocials',fetchuser, async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const socials = await Social.find({
        _id: { $in: ids }
      });

      return res.json(socials);
    }

    // fallback → normal getList
    const socials = await Social.find();
    res.json(socials);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsinglesocial/:id",fetchuser, async (req, res) => {
  const social = await Social.findById(req.params.id);
  res.json(social);
   

//   res.json({
//     id: social._id.toString(),
//     ...social
    
//   });
});
router.post('/addsocial',fetchuser,[
    body('platformName').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {platformName,url}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const social=new Social({
            platformName,url
        })
        const savedsocial=await social.save();
        success=true;
        res.json(savedsocial)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.put('/updatesocial/:id',fetchuser,async (req,res)=>{
    const {platformName,url}=req.body;
    const newSocial={};
    if(platformName){newSocial.platformName=platformName};
    if(url){newSocial.url=url};

    let social=await Social.findById(req.params.id);
    if(!social){return res.status(404).send("Not Found")}


    social =await Social.findByIdAndUpdate(req.params.id,{$set:newSocial},{new:true})
    res.json({success: true, data:social});
})
router.delete('/deletesocial',fetchuser,async (req,res)=>{

    try {
        const { ids } = req.body; // array of ids
    
        if (!ids || !ids.length) {
          return res.status(400).json({ message: "No IDs provided" });
        }
    
        await Social.deleteMany({
          _id: { $in: ids },
        });
    
        res.json({ data: ids }); // IMPORTANT for react-admin
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
module.exports = router
const express = require('express')
const router = express.Router()
const Dentist = require('../models/Dentist')

router.get('/fetchalldentists', async (req, res) => {
    
    // const dentists=await Dentist.find({});
    // res.json(dentists);
     let filter = {};
      if (req.query.filter) {
        const f = JSON.parse(req.query.filter);
        if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
      }
      const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
      const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);
    
      const dentists = await Dentist.find(filter)
        .skip((page - 1) * perPage)
        .limit(perPage);
    
      const total = await Dentist.countDocuments(filter);
    
      res.json({ data: dentists, total });
})
router.get("/fetchsingledentist/:id", async (req, res) => {
  const dentist = await Dentist.findById(req.params.id);
  res.json(dentist);
});
router.post('/adddentist', async (req, res) => {

    // const { title,teaser } = req.body;
    // console.log(title,teaser);
    const { name,salary, contact, specialization, experienceLevel, gender } = req.body;
    const dentist = new Dentist({ 
        name,salary, contact, specialization, experienceLevel, gender
     })
    const savedDentist=await dentist.save();
    res.json(savedDentist);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatedentist/:id',async (req,res)=>{
    const {name,salary, contact, specialization, experienceLevel, gender}=req.body;
    const newDentist={};
    if(name){newDentist.name=name};
    if(salary){newDentist.salary=salary};
    if(contact){newDentist.contact=contact};
    if(specialization){newDentist.specialization=specialization};
    if(experienceLevel){newDentist.experienceLevel=experienceLevel};
    if(gender){newDentist.gender=gender};


    let dentist=await Dentist.findById(req.params.id);
    if(!dentist){return res.status(404).send("Not Found")}


    dentist =await Dentist.findByIdAndUpdate(req.params.id,{$set:newDentist},{new:true})
    res.json({success: true, data:dentist});
})

router.delete("/deletedentist", async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Dentist.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router


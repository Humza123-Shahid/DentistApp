const express = require('express')
const router = express.Router()
const Dentist = require('../models/Dentist')
const firstNames = {
  male:   ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Ahmed'],
  female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Fatima'],
  other:  ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie', 'Avery', 'Quinn', 'Skyler']
};

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Wilson', 'Khan', 'Ali', 'Ahmed', 'Hassan', 'Malik', 'Chaudhry'
];

const specializations = [
  'General Dentistry', 'Orthodontics', 'Periodontics', 'Endodontics',
  'Oral Surgery', 'Pediatric Dentistry', 'Prosthodontics', 'Cosmetic Dentistry'
];

const genders = ['male', 'female', 'other'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateContact() {
  // Generates a random PK-style number e.g. 03XX-XXXXXXX
  const prefix = ['0300', '0301', '0302', '0303', '0311', '0321', '0331', '0341'];
  const number = Math.floor(Math.random() * 9000000) + 1000000;
  return `${getRandom(prefix)}-${number}`;
}

router.post('/addbulkdentist',async (req,res)=>{
  try {
let success = false;
    const dentists = [];

    for (let i = 0; i < 1000; i++) {
      const gender  = getRandom(genders);
      const firstName = getRandom(firstNames[gender]);
      const lastName  = getRandom(lastNames);

      dentists.push({
        name:            `${firstName} ${lastName}`,
        salary:          Math.floor(Math.random() * 150000) + 50000,   // 50,000 – 200,000
        contact:         generateContact(),
        specialization:  getRandom(specializations),
        experienceLevel: Math.floor(Math.random() * 30) + 1,           // 1 – 30 years
        gender
      });
    }

    await Dentist.insertMany(dentists);
    console.log('✅ 1000 dentist records inserted successfully!');
success=true;
    res.json({success})
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } 
})
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
router.get('/fetchmanydentists', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const dentists = await Dentist.find({
        _id: { $in: ids }
      });

      return res.json(dentists);
    }

    // fallback → normal getList
    const dentists = await Dentist.find();
    res.json(dentists);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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


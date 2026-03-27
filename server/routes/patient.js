const express = require('express')
const router = express.Router()
const Patient = require('../models/Patient')

router.get('/fetchallpatients', async (req, res) => {
    
    // const patients=await Patient.find({});
    // res.json(patients);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const patients = await Patient.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Patient.countDocuments(filter);

  res.json({ data: patients, total });
})
router.get('/fetchmanypatients', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const patients = await Patient.find({
        _id: { $in: ids }
      });

      return res.json(patients);
    }

    // fallback → normal getList
    const patients = await Patient.find();
    res.json(patients);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsinglepatient/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.json(patient);
});
router.post('/addpatient', async (req, res) => {

    // const { title,teaser } = req.body;
    // console.log(title,teaser);
    const { name, email, address, contact, dateOfBirth, age, gender, nationality} = req.body;
    const patient = new Patient({ 
       name, email, address, contact, dateOfBirth, age, gender, nationality
     })
    const savedPatient=await patient.save();
    res.json(savedPatient);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatepatient/:id',async (req,res)=>{
    const {name, email, address, contact, dateOfBirth, age, gender, nationality}=req.body;
    const newPatient={};
    if(name){newPatient.name=name};
    if(email){newPatient.email=email};
    if(address){newPatient.address=address};
    if(contact){newPatient.contact=contact};
    if(dateOfBirth){newPatient.dateOfBirth=dateOfBirth};
    if(age){newPatient.age=age};
    if(gender){newPatient.gender=gender};
    if(nationality){newPatient.nationality=nationality};

    
    let patient=await Patient.findById(req.params.id);
    if(!patient){return res.status(404).send("Not Found")}


    patient =await Patient.findByIdAndUpdate(req.params.id,{$set:newPatient},{new:true})
    res.json({success: true, data:patient});
})

// })
router.delete("/deletepatient", async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Patient.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router

const express = require('express')
const Tooth = require('../models/Tooth')
const Patient = require('../models/Patient');
const router = express.Router();

const procedureTypes = ['Filling', 'Crown', 'Root Canal', 'Extraction', 'Implant', 'Veneer', 'Bridge', 'Cleaning'];
const statuses = ['Completed', 'Planned', 'Existing'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomProcedures() {
  const count = Math.floor(Math.random() * 4) + 1; // 1 to 4 procedures
  const procedures = [];
  for (let j = 0; j < count; j++) {
    procedures.push({
      procedureType: randomItem(procedureTypes),
      date: randomDate(new Date('2020-01-01'), new Date()),
      status: randomItem(statuses)
    });
  }
  return procedures;
}

router.post('/addbulktooth',async (req,res)=>{
  try {
    let success = false;
  const patientIds = await Patient.find().select("_id");
if (patientIds.length === 0 ) {
          console.log("Patients not found. Insert them first.");
          return;
        }
  const teeth = [];

  for (let i = 0; i < 1000; i++) {
    teeth.push({
      patient: randomItem(patientIds), // random patient ID
      toothNumber: Math.floor(Math.random() * 32) + 1, // 1–32 (Universal)
      procedures: generateRandomProcedures()
    });
  }

  await Tooth.insertMany(teeth);
  console.log('✅ 1000 tooth records inserted successfully');

  success=true;
    res.json({success})
  } catch (err) {
    console.error('❌ Error:', err);
  } 
})
router.get("/fetchalltooths", async (req, res) => {

    let filter = {};
      if (req.query.filter) {
        const f = JSON.parse(req.query.filter);
        if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
      }
      const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
      const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);
    
      const tooths = await Tooth.find(filter)
        .skip((page - 1) * perPage)
        .limit(perPage)
        //.lean();
    
      const total = await Tooth.countDocuments(filter);
    
       res.json({ data: tooths, total });
      //const data = tooths.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
    //res.json({ data, total });
      })
router.get('/fetchmanytooths', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const tooths = await Tooth.find({
        _id: { $in: ids }
      })
      // .lean();

       return res.json(tooths);
      //return res.json(tooths.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
    }

    // fallback → normal getList
    const tooths = await Tooth.find();
    res.json(tooths);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get('/fetchtoothsbypatient/:id', async (req, res) => {
    
    try {
      // console.log(req.params.id);
      const tooths = await Tooth.find({ patient: req.params.id });
      // console.log(tooths);
      return res.json( {data: tooths});
      
    }
   catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsingletooth/:id", async (req, res) => {
  try {
    const tooth = await Tooth.findById(req.params.id);
      res.json(tooth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/addtooth", async (req, res) => {
  try {
    console.log(req.body);
    const tooth = new Tooth(req.body);
    const saved = await tooth.save();

    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/addtoothbyadmin/:id", async (req, res) => {
  try {
    console.log(req.body);
    
    console.log(req.params.id);
    // const tooth = new Tooth(req.
    // body);
    const formattedData = req.body;
    await Tooth.deleteMany({ patient: req.params.id });
    // const saved = await tooth.save();
    await Tooth.insertMany(formattedData);
    res.status(201).json({ message: "Procedures saved successfully" });
    // res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/updatetooth/:id", async (req, res) => {
  try {
    const updated = await Tooth.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      data: {
        ...updated._doc,
        id: updated._id
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/deletetooth',async (req,res)=>{

    try {
        const { ids } = req.body; // array of ids
    
        if (!ids || !ids.length) {
          return res.status(400).json({ message: "No IDs provided" });
        }
    
        await Tooth.deleteMany({
          _id: { $in: ids },
        });
    
        res.json({ data: ids }); // IMPORTANT for react-admin
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})
module.exports=router
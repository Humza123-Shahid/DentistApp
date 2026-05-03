const express = require('express')
const router = express.Router()
const Procedure = require('../../models/Procedure')
const categories = ['Endodontics', 'Prosthodontics', 'Periodontics', 'Orthodontics', 'Oral Surgery'];
var fetchuser=require('../../middleware/fetchuser');

const proceduresByCategory = {
  Endodontics: [
    { name: 'Root Canal Therapy',         base: 'RCT' },
    { name: 'Pulpotomy',                  base: 'PLP' },
    { name: 'Pulpectomy',                 base: 'PLC' },
    { name: 'Apexification',              base: 'APX' },
    { name: 'Endodontic Retreatment',     base: 'ERX' },
    { name: 'Apicoectomy',                base: 'APC' },
  ],
  Prosthodontics: [
    { name: 'Full Crown Placement',       base: 'FCP' },
    { name: 'Dental Bridge',              base: 'DBR' },
    { name: 'Complete Denture',           base: 'CDN' },
    { name: 'Partial Denture',            base: 'PDN' },
    { name: 'Veneer Application',         base: 'VNR' },
    { name: 'Implant Crown',              base: 'ICR' },
  ],
  Periodontics: [
    { name: 'Scaling & Root Planing',     base: 'SRP' },
    { name: 'Gingivectomy',               base: 'GVX' },
    { name: 'Osseous Surgery',            base: 'OSS' },
    { name: 'Gingival Graft',             base: 'GGF' },
    { name: 'Periodontal Maintenance',    base: 'PMT' },
    { name: 'Bone Grafting',              base: 'BGF' },
  ],
  Orthodontics: [
    { name: 'Braces Placement',           base: 'BRP' },
    { name: 'Aligner Therapy',            base: 'ALT' },
    { name: 'Retainer Fitting',           base: 'RTF' },
    { name: 'Space Maintainer',           base: 'SPM' },
    { name: 'Palatal Expander',           base: 'PLX' },
    { name: 'Debonding',                  base: 'DBN' },
  ],
  'Oral Surgery': [
    { name: 'Tooth Extraction',           base: 'TXT' },
    { name: 'Wisdom Tooth Removal',       base: 'WTR' },
    { name: 'Dental Implant Placement',   base: 'DIP' },
    { name: 'Jaw Surgery',                base: 'JWS' },
    { name: 'Frenectomy',                 base: 'FRX' },
    { name: 'Cyst Removal',               base: 'CYR' },
  ],
};

const descriptionTemplates = [
  (name, cat) => `A standard ${cat.toLowerCase()} procedure involving ${name.toLowerCase()} performed under local anaesthesia.`,
  (name, cat) => `${name} is a routine ${cat.toLowerCase()} treatment aimed at restoring optimal oral health.`,
  (name, cat) => `This ${cat.toLowerCase()} procedure, ${name.toLowerCase()}, is recommended for patients requiring targeted dental intervention.`,
  (name, cat) => `${name} falls under ${cat} and is typically completed in one or more clinical visits.`,
  (name)      => `Comprehensive ${name.toLowerCase()} procedure following evidence-based dental protocols.`,
];

const durations = [15, 20, 30, 45, 60, 75, 90, 120];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCode(base, index) {
  return `${base}-${String(index).padStart(5, '0')}`;
}

// ── Generator ────────────────────────────────────────────────────────────────

function generateProcedures(count = 50) {
  const procedures = [];

  for (let i = 1; i <= count; i++) {
    const category  = randomItem(categories);
    const procedure = randomItem(proceduresByCategory[category]);
    const template  = randomItem(descriptionTemplates);

    procedures.push({
      name:            procedure.name,
      code:            generateCode(procedure.base, i),
      description:     template(procedure.name, category),
      category:        category,
      durationMinutes: randomItem(durations),
    });
  }

  return procedures;
}

// ── Main ─────────────────────────────────────────────────────────────────────

router.post('/addbulkprocedure',async (req,res)=>{
  try {
    let success = false;

    const procedures = generateProcedures(50);
    await Procedure.insertMany(procedures);

    console.log('🎉 Successfully inserted 1000 procedure records');
    success=true;
    res.json({success})
  } catch (err) {
    console.error('❌ Error:', err);
  } 
})
router.get('/fetchallprocedures',fetchuser, async (req, res) => {
    
    // const procedures=await Procedure.find({});
    // res.json(procedures);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const procedures = await Procedure.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Procedure.countDocuments(filter);

  res.json({ data: procedures, total });
})
router.get('/fetchmanyprocedures',fetchuser, async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const procedures = await Procedure.find({
        _id: { $in: ids }
      });

      return res.json(procedures);
    }

    // fallback → normal getList
    const procedures = await Procedure.find();
    res.json(procedures);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsingleprocedure/:id",fetchuser, async (req, res) => {
  const procedure = await Procedure.findById(req.params.id);
  res.json(procedure);
});
router.post('/addprocedure',fetchuser, async (req, res) => {

    // const { title,teaser } = req.body;
    // console.log(title,teaser);
    const { name, code, description, category, durationMinutes } = req.body;
    const procedure = new Procedure({ 
        name, code, description, category, durationMinutes
     })
    const savedProcedure=await procedure.save();
    res.json(savedProcedure);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateprocedure/:id',fetchuser,async (req,res)=>{
    const {name, code, description, category, durationMinutes}=req.body;
    const newProcedure={};
    if(name){newProcedure.name=name};
    if(code){newProcedure.code=code};
    if(description){newProcedure.description=description};
    if(category){newProcedure.category=category};
    if(durationMinutes){newProcedure.durationMinutes=durationMinutes};


    let procedure=await Procedure.findById(req.params.id);
    if(!procedure){return res.status(404).send("Not Found")}


    procedure =await Procedure.findByIdAndUpdate(req.params.id,{$set:newProcedure},{new:true})
    res.json({success: true, data:procedure});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
// router.delete('/deleteprocedure/:id',async (req,res)=>{

//     let procedure=await Procedure.findById(req.params.id);
//     console.log(req.params.id)
//     if(!procedure){return res.status(404).send("Not Found")}

    

//     procedure =await Procedure.findByIdAndDelete(req.params.id)
//     res.json({"Success":"Procedure has been deleted.",procedure:procedure});
// })
router.delete("/deleteprocedure",fetchuser, async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Procedure.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router

// const express = require('express')
// const router = express.Router()
// const fetchuser=require('../middleware/fetchuser')
// const Procedure = require('../models/Procedure')
// const {body,validationResult}=require('express-validator') 

// router.get('/fetchallprocedures',fetchuser, async (req, res) => {

//     const procedures=await Procedure.find({});
//     res.json(procedures);
// })

// router.post('/addprocedure',fetchuser,[
//     body('name').isLength({min:1}),
//     body('code').isLength({min:1}),
//     body('description').isLength({min:3}),
//     body('category').isLength({min:1})
// ], async (req, res) => {

//     const { name, code, description, category, durationMinutes } = req.body;
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()});
//     }
//     const procedure = new Procedure({ 
//         name, code, description, category, durationMinutes
//      })
//     const savedProcedure=await procedure.save();
//     res.json(savedProcedure);
// })

// module.exports=router
const express=require('express');
const router= express.Router();
const uploadpatienthistory = require("../middleware/uploadpatienthistory");
const PatientHistory = require('../models/PatientHistory');


router.get('/fetchallpatienthistories', async (req, res) => {
    
    // const patienthistories=await Procedure.find({});
    // res.json(patienthistories);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const patienthistories = await PatientHistory.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await PatientHistory.countDocuments(filter);

  res.json({ data: patienthistories, total });
})
router.get('/fetchmanypatienthistories', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const patienthistories = await PatientHistory.find({
        _id: { $in: ids }
      });

      return res.json(patienthistories);
    }

    // fallback → normal getList
    const patienthistories = await PatientHistory.find();
    res.json(patienthistories);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsinglepatienthistory/:id", async (req, res) => {
  const patienthistory = await PatientHistory.findById(req.params.id);
  res.json(patienthistory);
});
router.get('/patienthistorybypatientId', async (req, res) => {
    // const { filter } = req.query;
    // const { filterObj  } = JSON.parse(filter || '{}');
    
    // const history = await PatientHistory.find({ patient:filterObj.patient });
    // // res.json({ data: history, total: history.length });
    // const formatted = history.map(d => ({ ...d.toObject(), id: d._id.toString() }));

    // //res.set('Content-Range', `patient-history ${from}-${to}/${total}`);
    // res.json(formatted);
    try {
    const {
      patient,
      _page     = 1,
      _perPage  = 10,
      _sortField = 'createdAt',
      _sortOrder = 'DESC',
      ...otherFilters
    } = req.query;
  console.log(patient);
    // 1. Build filter
    const filter = { ...otherFilters };
    if (patient) filter.patient = patient;

    // 2. Sorting
    const sortOrder = _sortOrder === 'DESC' ? -1 : 1;
    const sort = { [_sortField]: sortOrder };

    // 3. Pagination
    const skip  = (Number(_page) - 1) * Number(_perPage);
    const limit = Number(_perPage);

    // 4. Query
    const [data, total] = await Promise.all([
      PatientHistory.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      PatientHistory.countDocuments(filter),
    ]);
   console.log(data);
    // 5. Map _id → id (react-admin expects "id")
    const formatted = data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

    res.json({ data: formatted, total });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/patient-history/:id', async (req, res) => {
    const history = await PatientHistory.findById(req.params.id);
    res.json({ data: history });
});
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
// router.get('/fetchallpatienthistories',async (req,res)=>{
//     try {
    
//     const patienthistory=await PatientHistory.find({});
//     //const questions=await Questions.find({user:req.user.id});
//         res.json(patienthistory)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
// router.post('/addpatienthistory',fetchuser,uploadpatienthistory.single("file"),[
router.post('/addpatienthistory',uploadpatienthistory.fields([
  { name: 'xray', maxCount: 1 }, // Expects a single file from the 'profile' field
  { name: 'intraoralscan', maxCount: 1 }  // Expects up to 5 files from the 'gallery' field
]),async (req,res)=>{
    try {
        let success = false;
        const {patient,chronicConditions,cavaties,crowns,fillings}=req.body;
        // console.log(req.files[0]?.path)
        // console.log(req.files[1]?.path)
        // const profileFile = req.files['profile'] ? req.files['profile'][0] : null;
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        // return res.status(400).json({ success,errors: errors.array() });
        // }
        const xraypath = req.files?.['xray'] ? req.files['xray'][0].path : "";
        const intraoralscanpath = req.files?.['intraoralscan'] ? req.files['intraoralscan'][0].path : "";
        const patienthistory=new PatientHistory({
            // patient,chronicConditions,cavaties,crowns,fillings,xrayFilePath:req.files['xray'][0]?.path,intraoralscanFilePath:req.files['intraoralscan'][0]?.path
            patient,chronicConditions,cavaties,crowns,fillings,xrayFilePath:xraypath,intraoralscanFilePath:intraoralscanpath

          })
        const savedPatientHistory=await patienthistory.save();
        console.log(savedPatientHistory);
        success=true;
        res.json(savedPatientHistory)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatepatienthistory/:id',uploadpatienthistory.fields([
  { name: 'xray', maxCount: 1 }, // Expects a single file from the 'profile' field
  { name: 'intraoralscan', maxCount: 1 }  // Expects up to 5 files from the 'gallery' field
]),async (req,res)=>{
    const {patient,chronicConditions,cavaties,crowns,fillings,xray,intraoralscan}=req.body;
    const newPatientHistory={};
    if(patient){newPatientHistory.patient=patient};
    if(chronicConditions){newPatientHistory.chronicConditions=chronicConditions};
    if(cavaties){newPatientHistory.cavaties=cavaties};
    if(crowns){newPatientHistory.crowns=crowns};
    if(fillings){newPatientHistory.fillings=fillings};
    //  newPatientHistory.xrayFilePath = req.files?.['xray'] ? req.files['xray'][0].path : "";
    // newPatientHistory.intraoralscanFilePath = req.files?.['intraoralscan'] ? req.files['intraoralscan'][0].path : "";
   

   console.log(xray)
   console.log(intraoralscan)
    if (req.files['xray']) {
      console.log("here2");
    newPatientHistory.xrayFilePath = req.files['xray'][0]?.path; // overwrite only if new file
  }
  else if(xray === 'null' || xray === null || xray === ""){
    console.log("here");
    newPatientHistory.xrayFilePath="";
  }
  if (req.files['intraoralscan']) {
    newPatientHistory.intraoralscanFilePath = req.files['intraoralscan'][0]?.path // overwrite only if new file
  }
  else if(intraoralscan === 'null' || intraoralscan === null || intraoralscan === ""){
    newPatientHistory.intraoralscanFilePath="";
  }
    // if(signatureUrl){newPatientHistory.signatureUrl=signatureUrl};

    let patienthistory=await PatientHistory.findById(req.params.id);
    if(!patienthistory){return res.status(404).send("Not Found")}

    console.log(newPatientHistory);
    patienthistory =await PatientHistory.findByIdAndUpdate(req.params.id,{$set:newPatientHistory},{new:true})
    res.json({success: true, data:patienthistory});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete("/deletepatienthistory", async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await PatientHistory.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router
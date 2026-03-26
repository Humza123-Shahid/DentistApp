const express = require('express')
const router = express.Router()
const Procedure = require('../models/Procedure')

router.get('/fetchallprocedures', async (req, res) => {
    
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
router.get('/fetchmanyprocedures', async (req, res) => {
    
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
router.get("/fetchsingleprocedure/:id", async (req, res) => {
  const procedure = await Procedure.findById(req.params.id);
  res.json(procedure);
});
router.post('/addprocedure', async (req, res) => {

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
router.put('/updateprocedure/:id',async (req,res)=>{
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
router.delete("/deleteprocedure", async (req, res) => {
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
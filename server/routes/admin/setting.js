const express = require('express')
const router = express.Router()
const Setting = require('../../models/Setting')
var fetchuser=require('../../middleware/fetchuser');

router.get('/fetchallSettings',fetchuser, async (req, res) => {
    
    // const settings=await Setting.find({});
    // res.json(settings);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const settings = await Setting.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Setting.countDocuments(filter);

  res.json({ data: settings, total });
})
router.get('/fetchmanySettings',fetchuser, async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const settings = await Setting.find({
        _id: { $in: ids }
      });

      return res.json(settings);
    }

    // fallback → normal getList
    const settings = await Setting.find();
    res.json(settings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsinglesetting/:id",fetchuser, async (req, res) => {
  const setting = await Setting.findById(req.params.id);
  res.json(setting);
   

  // res.json({
  //   id: setting._id.toString(),
  //   ...setting
    
  // });
});
router.post('/addsetting',fetchuser, async (req, res) => {

    // const { title,teaser } = req.body;
        const { key,value,category} = req.body;

     console.log(key, value);
    const setting = new Setting({ 
        key, value, category
     })
    const savedsetting=await setting.save();
    res.json(savedsetting);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatesetting/:id',fetchuser,async (req,res)=>{
    const {key, value, category}=req.body;
    const newsetting={};
    if(key){newsetting.key=key};
    if(value){newsetting.value=value};
    if(category){newsetting.category=category};

    let setting=await Setting.findById(req.params.id);
    if(!setting){return res.status(404).send("Not Found")}


    setting =await Setting.findByIdAndUpdate(req.params.id,{$set:newsetting},{new:true})
    res.json({success: true, data:Setting});
})

// })
router.delete("/deletesetting",fetchuser, async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Setting.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router

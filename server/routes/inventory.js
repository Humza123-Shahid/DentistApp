const express = require('express')
const router = express.Router()
const Inventory = require('../models/Inventory')

router.get('/fetchallinventories', async (req, res) => {
    
    // const inventories=await Inventory.find({});
    // res.json(inventories);
    let filter = {};
  if (req.query.filter) {
    const f = JSON.parse(req.query.filter);
    if (f.name) filter.name = { $regex: f.name, $options: 'i' }; // case-insensitive search
  }
  const page = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).page : 1);
  const perPage = parseInt(req.query.pagination ? JSON.parse(req.query.pagination).perPage : 25);

  const inventories = await Inventory.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage);

  const total = await Inventory.countDocuments(filter);

  res.json({ data: inventories, total });
})
router.get('/fetchmanyinventories', async (req, res) => {
    
    try {
    const { ids } = req.query;

    // If ids exist → handle getMany
    if (ids) {
      const inventories = await Inventory.find({
        _id: { $in: ids }
      });

      return res.json(inventories);
    }

    // fallback → normal getList
    const inventories = await Inventory.find();
    res.json(inventories);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
router.get("/fetchsingleinventory/:id", async (req, res) => {
  const inventory = await Inventory.findById(req.params.id);
  res.json(inventory);
});
router.post('/addinventory', async (req, res) => {

    // const { title,teaser } = req.body;
    // console.log(title,teaser);
    const { name, quantity, description, costPerUnit } = req.body;
    const inventory = new Inventory({ 
        name, quantity, description, costPerUnit
     })
    const savedInventory=await inventory.save();
    res.json(savedInventory);
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateinventory/:id',async (req,res)=>{
    const {name, quantity, description, costPerUnit}=req.body;
    const newInventory={};
    if(name){newInventory.name=name};
    if(quantity){newInventory.quantity=quantity};
    if(description){newInventory.description=description};
    if(costPerUnit){newInventory.costPerUnit=costPerUnit};

    let inventory=await Inventory.findById(req.params.id);
    if(!inventory){return res.status(404).send("Not Found")}


    inventory =await Inventory.findByIdAndUpdate(req.params.id,{$set:newInventory},{new:true})
    res.json({success: true, data:inventory});
})

// })
router.delete("/deleteinventory", async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await Inventory.deleteMany({
      _id: { $in: ids },
    });

    res.json({ data: ids }); // IMPORTANT for react-admin
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports=router
